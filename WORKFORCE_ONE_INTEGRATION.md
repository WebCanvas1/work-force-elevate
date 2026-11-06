# Workforce One integration

Find a Job uses the supplied recruitment photo and wording, including all nine candidate FAQs. The jobs board and registration are hosted by Workforce One; the website does not collect or submit applicant data itself.

## Website addresses for whitelisting

- Current GitHub Pages website: https://webcanvas1.github.io/work-force-elevate/
- Find a Job page: https://webcanvas1.github.io/work-force-elevate/#/find-a-job
- Origin to allow: `https://webcanvas1.github.io`
- Production origins: retain `https://yourcrew.com.au` and `https://www.yourcrew.com.au`.

Any separate preview or production hosting domain will also need to be allowed by Workforce One. A URL fragment such as `#/find-a-job` is not part of the origin.

## Destinations

- Jobs: https://yourcrew.workforceone.com.au/job-board
- Registration: https://yourcrew-portal.workforceone.com.au/employee/#/register

Both are embedded with accessible frame titles and permanent direct links that open a new tab. The available Workforce One iframe resizer is loaded once and initialized explicitly after mounting, with messages restricted to each destination origin. Scrollable frames remain usable if automatic resizing is unavailable. No global load handler or automatic parent-page scrolling is installed.

## Observed integration issues

Checked 7 November 2026:

- The supplied registration helper at `https://yourcrew-portal.workforceone.com.au/assets/js/codehouse-jobboard.js` returns HTTP 404.
- The registration response has a Content Security Policy with `frame-ancestors https://yourcrew.com.au/ https://www.yourcrew.com.au/`. Its current policy blocks localhost and GitHub Pages embedding. It also sends `X-Frame-Options: SAMEORIGIN`; Workforce One should ensure its framing headers consistently permit approved domains.
- The jobs-board helper is available, but assigns `window.onload` and scrolls the parent page. This implementation embeds the same destination directly and uses the vendor's available `iframeResizer.min.js` instead.
- The live jobs board rendered within the local preview. The direct registration link loaded the registration form. Registration within the preview iframe was refused, as expected from its policy.

Ask Workforce One to add the preview origin, confirm both production origins, and confirm the supported registration helper URL if they require their wrapper script. After the whitelist is updated, recheck the registration iframe on the hosted page, including resizing and navigation. No applicant account was created or submitted during verification.

Changes remain on the review branch until merged. The current GitHub Pages URL does not contain these changes until deployment.
