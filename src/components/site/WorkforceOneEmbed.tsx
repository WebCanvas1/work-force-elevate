import { useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";
import { workforceOne } from "../../lib/workforce-one";

type ResizableFrame = HTMLIFrameElement & { iFrameResizer?: { close: () => void; removeListeners: () => void } };
type ResizerWindow = Window & { iFrameResize?: (options: Record<string, unknown>, frame: HTMLIFrameElement) => void };
let resizerPromise: Promise<void> | undefined;

function loadResizer() {
  if ((window as ResizerWindow).iFrameResize) return Promise.resolve();
  if (!resizerPromise) resizerPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = workforceOne.resizer;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => { script.remove(); resizerPromise = undefined; reject(new Error("Frame resizing unavailable")); };
    document.head.appendChild(script);
  });
  return resizerPromise;
}

export function WorkforceOneEmbed({ kind }: { kind: "jobs" | "registration" }) {
  const ref = useRef<ResizableFrame>(null);
  const url = workforceOne[kind];
  const title = kind === "jobs" ? "Your Crew jobs board — Workforce One" : "Register with Your Crew — Workforce One";
  useEffect(() => {
    let cancelled = false;
    const frame = ref.current;
    loadResizer().then(() => {
      if (!cancelled && frame && !frame.iFrameResizer) {
        (window as ResizerWindow).iFrameResize?.({
          checkOrigin: [new URL(url).origin],
          heightCalculationMethod: "taggedElement",
          scrolling: true,
          warningTimeout: 0,
          log: false,
        }, frame);
      }
    }).catch(() => { /* A scrollable frame and direct link remain usable without resizing. */ });
    return () => { cancelled = true; frame?.iFrameResizer?.removeListeners(); };
  }, [url]);
  return <div>
    <p className="mb-6 text-muted-foreground">{kind === "jobs" ? "Browse and apply for current opportunities with Your Crew." : "Create your account, save your CV and upload your licences and certificates."}{" "}
      <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary underline underline-offset-4">{kind === "jobs" ? "Open jobs board in a new tab" : "Open registration in a new tab"}<ExternalLink className="h-4 w-4" aria-hidden="true" /></a>
    </p>
    <iframe ref={ref} id={kind === "jobs" ? "workforce-one-jobs" : "workforce-one-registration"} src={url} title={title} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="block w-full rounded-2xl border border-border bg-white" style={{ minHeight: kind === "jobs" ? 760 : 1000, height: kind === "jobs" ? 760 : 1000 }} />
    <p className="mt-4 text-muted-foreground">If the {kind === "jobs" ? "jobs board" : "registration form"} doesn’t appear, use the link above to continue in Workforce One.</p>
  </div>;
}
