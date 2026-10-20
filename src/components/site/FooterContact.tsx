import { useContentValue } from "../../lib/site-content";
export function FooterContact({ kind }: { kind: "phone" | "email" }) {
  const phone = useContentValue("global.phone", "0451 267 768");
  const email = useContentValue("global.email", "info@yourcrew.com.au");
  return kind === "phone"
    ? <a href={`tel:${phone.replace(/[^+0-9]/g, "")}`} className="hover:text-white">{phone}</a>
    : <a href={`mailto:${email}`} className="hover:text-white">{email}</a>;
}
