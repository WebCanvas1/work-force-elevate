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

The editor supports the page content and settings listed under Current admin controls below. Additional sections can be created with the Page builder.

## Architecture and security

- Published field overrides are stored in KV as a single JSON object.
- Images are stored in R2 and delivered through the `/cms-media/` endpoint.
- Password verification happens server-side; an HttpOnly, Secure, SameSite=Strict session cookie is issued.
- Write endpoints check the session and same-origin request header.
- Avoid storing user passwords in frontend code.
- The editor has no default password.

## Limitations

- There is currently no version history or user-roles feature.
- The Preview panel shows unpublished drafts using same-origin preview messages.
- Changes may take up to roughly 45 seconds to appear for visitors due to cache headers.


## Current admin controls

- Homepage: hero, service and process headings; process step titles, descriptions and photos; certification image replacements; visibility of feature cards, certifications and How it works. Empty certificate replacement fields retain the original supplied images.
- About Us: headings, hero photo, Ringwood meeting text, years of service and the three service tile labels; compact or spacious section spacing.
- Find a Job: supplied introductory copy, benefits, all candidate FAQs and categories; registration invitation, button text, destination, colour and visibility; recruitment email and phone; order of recruitment contact and registration sections.
- Find Staff: headings and hero photo; all 32 employer FAQ questions, answers and category names. These FAQs are shared with the dedicated FAQ page.
- Contact: headings, shared contact email and phone, office address, business hours, Google Maps embed URL and directions link; four service tile images, titles, visibility, position and optional links. Leave tile link fields empty to keep tiles non-clickable.
- News: add, edit, unpublish or delete articles; upload or replace article images, edit their descriptions, and preview images. Samples can be deleted permanently by publishing an explicit empty article list.
- Website Settings: shared Request Staff destination, logo image and size, and minimum public text size (18 or 20px).

Choose a page in the sidebar, make edits, use Preview, then Publish changes. The current design is preserved until a setting is changed and published. Removed built-in sections (Industries, Careers, quoted reviews and the About timeline) remain removed; new content can be added with the Page builder.

Google map URLs must be HTTPS URLs on maps.google.com or www.google.com under /maps. Registration and directions links must be HTTPS. Workforce One listings, applications and registrations are managed in Workforce One, not in this website editor.
