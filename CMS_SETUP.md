# Work-Force Elevate CMS Setup

The repository now includes a WordPress-style editing interface at the hash URL `/#/admin`, intended for deployment on **Cloudflare Pages** with Functions enabled.

## Required Cloudflare configuration

1. In Cloudflare, create a **Workers KV namespace**, e.g. `WFE_CMS_CONTENT`. Bind the namespace to the Pages project with the binding name **CMS_CONTENT**.
2. Create an **R2 bucket** to store uploaded images, e.g. `wfe-cms-media`, and bind it to the Pages project with the binding name **CMS_MEDIA**.
3. Under the Pages project's **Settings → Variables and Secrets**, create **encrypted** secrets:
   - `ADMIN_PASSWORD`: a strong, unique password for the site owner. Do not put it in GitHub.
   - `SESSION_SECRET`: a cryptographically random secret, at least 32 bytes long. Do not put it in GitHub.
4. Set the build command to `npm run build` and publish directory to `dist`. Deploy via Cloudflare Pages Git integration.
5. Visit `https://your-domain.example/#/admin` and sign in. Check the deployment's Functions tab if the login returns 404.
6. Use the sidebar to edit sections and upload images, then click **Publish changes**.
7. Confirm the change on the public website, and test the form pages before handing credentials to the customer.

**Important:** This admin relies on Pages Functions. It will not save when hosted as a static-only GitHub Pages site, and it has not been tested against your live Cloudflare account. The admin password must be set before the editor can log in.

## Editing coverage

The editor currently supports page headings, hero images, logo, brand name, phone and email in the footer, with protected publishing and stored images. It does **not** yet edit every paragraph, service card, job listing, form field, or navigation item. Further integration is needed for complete front-end coverage.

## Architecture and security

- Published field overrides are stored in KV as a single JSON object.
- Images are stored in R2 and delivered through the `/cms-media/` endpoint.
- Password verification happens server-side; an HttpOnly, Secure, SameSite=Strict session cookie is issued.
- Write endpoints check the session and same-origin request header.
- Avoid storing user passwords in frontend code.
- The editor has no default password.

## Limitations

- There is currently no version history or user-roles feature.
- Page preview displays the live published page. Unpublished drafts are not shown in the preview.
- Changes may take up to roughly 45 seconds to appear for visitors due to cache headers.
