interface Env { CMS_CONTENT: KVNamespace; ADMIN_PASSWORD: string; SESSION_SECRET: string; CMS_MEDIA?: R2Bucket }
type Context = { request: Request; env: Env; next: () => Promise<Response> };
const encoder = new TextEncoder();
const error = (message: string, status = 400) => Response.json({error:message},{status});
const cookie = (request:Request) => request.headers.get("cookie")?.match(/(?:^|;\s*)wfe_session=([^;]+)/)?.[1] || "";
const hash = async (value:string) => new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(value)));
const toHex = (bytes:Uint8Array) => [...bytes].map(n=>n.toString(16).padStart(2,"0")).join("");
const sign = async (value:string, secret:string) => {
 const key=await crypto.subtle.importKey("raw",encoder.encode(secret),"HMAC",false,["sign"]);
 return toHex(new Uint8Array(await crypto.subtle.sign("HMAC",key,encoder.encode(value))));
};
const trusted = async (request:Request,env:Env) => {
 const token=cookie(request),[expiry,signature]=token.split(".");
 if(!expiry||!signature||!env.SESSION_SECRET||!/^[0-9]{10,15}$/.test(expiry)||Number(expiry)<Date.now())return false;
 const expected=await sign(expiry,env.SESSION_SECRET);
 if(expected.length!==signature.length)return false;
 let diff=0;for(let i=0;i<expected.length;i++)diff|=expected.charCodeAt(i)^signature.charCodeAt(i);
 return diff===0;
};
async function handleRequest(ctx:Context) {
 const {request,env}=ctx;
 const url=new URL(request.url),path=url.pathname;
 if(path.startsWith("/api/")) {
  if(!env.CMS_CONTENT) return error("CMS_CONTENT KV binding is not configured",503);
  if(path==="/api/site-content" && request.method==="GET"){
   const content=await env.CMS_CONTENT.get("website_content","json") || {};
   return Response.json({content},{headers:{"cache-control":"public, max-age=45"}});
  }
  if(path==="/api/admin/login" && request.method==="POST"){
   const origin=request.headers.get("origin");if(!origin||origin!==url.origin)return error("Invalid request origin",403);
   if(!env.ADMIN_PASSWORD||!env.SESSION_SECRET)return error("Admin secrets are not configured",503);
   if(Number(request.headers.get("content-length")||0)>10000)return error("Invalid request");
   const payload=await request.json().catch(()=>({})) as {password?:string};
   const actual=await hash(typeof payload.password==="string"?payload.password:"");
   const expected=await hash(env.ADMIN_PASSWORD);
   let diff=0;for(let i=0;i<actual.length;i++)diff|=actual[i]^expected[i];
   if(diff!==0)return error("Incorrect password",401);
   const expiry=String(Date.now()+8*60*60*1000);
   const signature=await sign(expiry,env.SESSION_SECRET);
   return Response.json({ok:true},{headers:{"set-cookie":`wfe_session=${expiry}.${signature}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800`,"cache-control":"no-store"}});
  }
  if(path==="/api/admin/logout" && request.method==="POST")
   return Response.json({ok:true},{headers:{"set-cookie":"wfe_session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0"}});
  if(!path.startsWith("/api/admin/"))return error("Not found",404);
  if(!(await trusted(request,env)))return error("Unauthorised",401);
  if(request.method!=="GET"&&request.method!=="HEAD"){
   const origin=request.headers.get("origin");
   if(!origin||origin!==url.origin)return error("Invalid request origin",403);
  }
  if(path==="/api/admin/session"&&request.method==="GET")return Response.json({ok:true},{headers:{"cache-control":"no-store"}});
  if(path==="/api/admin/content"&&request.method==="GET"){
   const content=await env.CMS_CONTENT.get("website_content","json")||{};
   return Response.json({content,defaults:{}},{headers:{"cache-control":"no-store"}});
  }
  if(path==="/api/admin/content"&&request.method==="PUT"){
   const raw=await request.text();
   if(raw.length>150000)return error("Content is too large",413);
   let data: {content?:Record<string,unknown>};
   try { data=JSON.parse(raw) as {content?:Record<string,unknown>}; } catch { return error("Invalid JSON"); }
   if(!data.content||typeof data.content!=="object"||Array.isArray(data.content))return error("Invalid content");
   const entries=Object.entries(data.content);
   if(entries.length>500||entries.some(([key,val])=>key.length>120||!/^([a-z0-9-]+\.)+[a-z0-9-]+$/.test(key)||typeof val!=="string"||val.length>10000))return error("Content validation failed");
   await env.CMS_CONTENT.put("website_content",JSON.stringify(data.content));
   return Response.json({ok:true});
  }
  if(path==="/api/admin/upload"&&request.method==="POST"){
   if(!env.CMS_MEDIA)return error("CMS_MEDIA R2 binding is not configured",503);
   const form=await request.formData();
   const file=form.get("file");
   if(!(file instanceof File))return error("No image uploaded");
   if(file.size>5*1024*1024)return error("File is too large",413);
   const extensions:Record<string,string>={"image/jpeg":"jpg","image/png":"png","image/webp":"webp","image/gif":"gif"};
   const ext=extensions[file.type];if(!ext)return error("Please upload a JPEG, PNG, WebP or GIF");
   const id=crypto.randomUUID(),key=`images/${id}.${ext}`;
   await env.CMS_MEDIA.put(key,file.stream(),{httpMetadata:{contentType:file.type}});
   return Response.json({url:`/cms-media/${id}.${ext}`});
  }
  return error("Not found",404);
 }
 if(path.startsWith("/cms-media/")){
  if(!env.CMS_MEDIA)return error("Media storage unavailable",503);
  const filename=path.slice("/cms-media/".length);
  if(!/^[a-f0-9-]{36}\.(jpg|png|webp|gif)$/.test(filename))return error("Not found",404);
  const object=await env.CMS_MEDIA.get("images/"+filename);
  if(!object)return error("Not found",404);
  return new Response(object.body,{headers:{"content-type":object.httpMetadata?.contentType||"application/octet-stream","cache-control":"public, max-age=86400","x-content-type-options":"nosniff"}});
 }
 return ctx.next();
}

/** Keep unexpected Pages runtime failures observable without exposing credentials. */
export async function onRequest(ctx: Context): Promise<Response> {
 try { return await handleRequest(ctx); }
 catch (cause) {
  const path = new URL(ctx.request.url).pathname;
  const message = cause instanceof Error ? cause.message : String(cause);
  console.error("CMS function exception", {path, message, stack: cause instanceof Error ? cause.stack : undefined});
  return Response.json({error:"CMS server error. Check Cloudflare Pages Functions logs.",code:"CMS_RUNTIME_ERROR"},{status:500,headers:{"cache-control":"no-store"}});
 }
}
