# Website decisions

## 2026-10-23 — GitHub username and Pages address migration

- The owner personally changed the GitHub username to `zhangyifancharles` and confirmed completion.
- Rename the existing website repository to `zhangyifancharles/zhangyifancharles.github.io`, preserving repository ID `1431075826` and its commit history.
- Use `https://zhangyifancharles.github.io/` as the canonical homepage and `https://github.com/zhangyifancharles/zhangyifancharles.github.io.git` as the Git remote.
- The deployment configuration derives the site origin and root base from `GITHUB_REPOSITORY`; no application code change or `SITE_URL` override is needed. Publishing this documentation update triggers a build for the renamed repository.
- Preserve earlier deployment addresses below as historical records. Keep the existing English desktop layout and portrait.
- No tests or browser validation were run, per the owner's instruction. The required static build and Pages deployment run through GitHub Actions; deployment completion is reported separately after Actions finishes.

## 2026-10-23 — Owner-supplied portrait

- The owner supplied a personal photograph and requested a suitable placement on the existing website.
- Display a 176 × 220px rectangular portrait at the right of the introduction, using the shared homepage/About component. Keep the 650px reading column, plain typography, and white background with black text. Retain natural color in the photo without borders, shadows, or decorative framing.
- Store only a cropped, compressed 640 × 800 JPEG in `public/images/zhang-yifan-charles.jpg`; preserve the supplied original outside the repository and strip camera metadata from the published derivative. Configure the asset path through `portrait` in the profile data, and use the existing base-aware URL helper and English alt text.
- Publish through the existing GitHub Actions workflow. No test suite, Astro check, output checker, or browser validation was run, per the owner's continuing instruction; the workflow performs the static build required for deployment.

## 2026-10-23 — GitHub Pages deployment completed

- The owner explicitly requested GitHub deployment and completed GitHub authorization for CharlesZhang-06.
- The personal-site repository did not exist, so create the public repository `CharlesZhang-06/CharlesZhang-06.github.io` without replacing existing remote content.
- Publish at https://charleszhang-06.github.io/ with GitHub Actions as the Pages source. Pushes to `main` rebuild and deploy automatically.
- Initial source commit: `1227c6e28de5c8a660ca0f946ff4cc7fb846ffc2`. Deployment run: https://github.com/CharlesZhang-06/CharlesZhang-06.github.io/actions/runs/39960711561. Both the build and deploy jobs completed successfully, and the Pages API reported `built`.
- The required local static build and remote deployment build succeeded. No test suite, Astro check, output checker, or browser validation was run, per the owner's instruction.
- Preserve the English monochrome desktop design. Development samples are excluded from production; Blog and Project remain empty until real content is supplied.

## 2026-10-23 — GitHub Pages publication preparation

The owner supplied the name ZHANG Yifan Charles and explicitly requested deployment to GitHub.

- Mark the supplied identity and current neutral site introduction as approved for publication. Do not invent biography, credentials, projects, or contacts. Adapt the profile guard to the current introduction-based design: an unused headline and optional biography are not required.
- Keep About / Blog / Project visible in the public header. Always generate both archives with honest empty messages when no real content exists. This supersedes the earlier hide-empty-archive rule. Development demos remain excluded from production.
- The deployment workflow runs the necessary static build and profile publication guard, without the test suite, Astro check, output checker, or browser validation requested to be skipped by the owner.
- Preserve the monochrome desktop design and existing article/project URLs.
- At preparation time GitHub CLI authentication was invalid and SSH had no accepted key. A GitHub login is required before inspecting or creating the destination repository; no remote publication has been claimed.

## 2026-10-23 — Project navigation

- Add Project immediately after Blog in the centered header, linking to the existing project archive when visible projects exist.
- Use Blog as the public article label, including the homepage link. Do not add a separate Writing entry; retain existing article URLs.
- Widen the centered navigation track to fit three links while preserving its alignment and the monochrome layout.
- No tests, builds, or browser validation were run, as requested.

## 2026-10-23 — Reference layout with the approved monochrome palette

The owner approved adapting Nathan Chen's layout while preserving the current white background and black text. This supersedes the earlier 760px homepage and its writing/project sections.

- Separate the full-width header from the centered reading column: name on the left, About / Blog in the center, configured contact links on the right. Do not invent social accounts or display empty links.
- Use a 650px desktop column, 17px serif body text, a greeting at body size, and short paragraphs with 17px spacing. Use local Georgia / Times fonts to avoid adding external font requests.
- Make the homepage the personal introduction. Reuse it on the existing About route. Optional biography paragraphs, beliefs, interests, current focus, CV, and contact links come from the profile data; empty sections are omitted.
- Put writing on the separate Blog page, retaining `/writing/` and all existing article URLs. Use date-left/title-right rows and a small monochrome topic legend. Retain explicit Sample labels on development examples.
- Keep projects accessible through a plain link in the introduction rather than a homepage list. Remove the copyright block in favor of compact Home / RSS footer links.
- Preserve the white background and black text, including links and code. Add no particles, colored tags, external font dependencies, or mobile breakpoints.
- Per the owner's continuing instruction, do not run tests, production builds, or browser validation. No such checks were run for this revision.

## 2026-10-23 — Minimal black-and-white revision

The owner rejected the decorative layout and requested a much simpler personal homepage: white background, black text, clear information. This supersedes the warm white and green visual direction below.

- Use a fixed 760px desktop column with ordinary text navigation and modest headings.
- Lead with the person's name and a short introduction; show writing and projects as plain lists.
- Remove orbital illustrations, project artwork, colored accents, oversized slogans, numbering, card treatments, archive filters, the preview banner, and the promotional footer.
- Keep sample items explicitly marked as Sample. No personal identity or biography has been invented.
- Apply the same typography and monochrome styling to archives, About, and article pages.
- Retain the English-only and desktop-only scope. No tests, builds, or browser verification were run, as requested.

## 2026-10-23 — English desktop revision

The owner clarified that the website must be entirely in English and does not need a mobile implementation. This supersedes the earlier Chinese-interface and mobile-layout choices.

- Translate all public-facing page copy, navigation, accessibility labels, dates, RSS language metadata, and sample content into English.
- Set the page language and article language default to English.
- Remove the dedicated mobile menu, mobile table-of-contents behavior, and tablet/mobile stylesheet overrides.
- Adjust display typography for English text while retaining the warm white and green desktop design.
- Preserve the existing distinction between local demo content and published personal material.
- Do not run further tests, production builds, or browser validation for this revision, per the owner's instruction. Previous checks do not establish the correctness of this revised version.
- Move the previous Chinese build and preview screenshots into the workspace's intermediate `work/` folder so they are not presented as current deliverables.

Astro, Markdown content collections, static output, and the GitHub Pages deployment workflow remain the chosen architecture. No remote publication has been performed. Personal identity, biography, and the destination repository remain unspecified.
