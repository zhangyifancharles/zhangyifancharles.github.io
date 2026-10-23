# Personal website

An English personal website for desktop, built with Astro, Markdown, and native CSS.

Live website: https://charleszhang-06.github.io/

Source repository: https://github.com/CharlesZhang-06/CharlesZhang-06.github.io

The design uses a pure white background, black text, serif typography, and a centered 650px reading column. The header places the name on the left, About / Blog / Project in the center, and configured contact links on the right. The homepage is a personal introduction in short paragraphs; writing is listed on a separate Blog page with dates on the left and titles on the right. There are no decorative illustrations, cards, promotional headings, or colored accents. Blog and Project are permanent header links. Empty archives display No posts yet / No projects yet; development samples are excluded from the public website. A quiet project link also appears in the introduction when projects exist. The public article entry is called Blog; no separate Writing entry is displayed.

## Local development

Use Node.js 24 and run these commands from this folder:

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:4321/`. If running from an agent environment that backgrounds Astro automatically, use `npm run dev -- --ignore-lock` for a foreground server.

## Personalize the site

Edit `src/data/profile.json` to add your name, introduction, biography paragraphs (`about`), current focus, and optional contact links. Optional `beliefs` and `interests` arrays render as simple lists; beliefs use two columns. Empty sections are omitted. The same personal introduction is used on `/` and `/about/`. The Blog page keeps its existing `/writing/` URL so existing article links continue to work. Typography uses local Georgia / Times fonts without external font requests. No biography or contact information has been invented. The owner supplied the name ZHANG Yifan Charles and approved publication. Optional biography and contact fields remain empty until supplied.

Write articles in `src/content/writing/` and project descriptions in `src/content/projects/`. All current samples are in English and have `demo: true`: they appear in development and are excluded from production output. Drafts are excluded in both modes. Keep confidential drafts outside any public repository.

An article starts with metadata such as:

```yaml
---
title: "An article title"
summary: "A short description of the article."
slug: an-article-title
date: 2026-10-23
kind: essay
lang: en
featured: false
draft: false
demo: false
---
```

Use `kind: technical` for a technical article with a summary and table of contents. Code highlighting and mathematical notation are rendered during the build. Put images in `public/images/` and use descriptive English alt text.

## GitHub Pages

A deployment workflow is included in `.github/workflows/deploy.yml`. It supports both `USERNAME.github.io` repositories and project repositories with a URL subpath. Configure the repository's Pages source as **GitHub Actions**. A custom domain can be specified with the `SITE_URL` repository variable and the corresponding GitHub Pages domain settings.

The owner has approved publication and `readyToPublish` is `true`. The profile guard requires a real name and introduction; biography, headline, interests, and contact information are optional. The release guard prevents publishing an unapproved or placeholder profile. The site was deployed on 2026-10-23 to `CharlesZhang-06/CharlesZhang-06.github.io`, using GitHub Actions as the Pages source. Future pushes to `main` automatically rebuild and publish the site.

The deployment build command is `node scripts/astro.mjs build`. The deployment workflow runs only the static build and the profile publication guard; it does not run the test suite, Astro check, or output checker, as requested. The static build and GitHub Pages deployment completed successfully on 2026-10-23. No tests or browser validation were run. The optional `npm run build` command also performs Astro and output checks; those checks are not part of the deployment workflow.

## Current scope

- English interface, metadata, sample writing, and sample projects.
- Desktop layout; no dedicated mobile navigation or mobile stylesheet.
- Static pages; no account system, database, comments, or analytics.
- Published as ZHANG Yifan Charles at https://charleszhang-06.github.io/.
- Biography, contact information, real posts, and real projects remain empty until supplied.

See `docs/DECISIONS.md` for the latest scope decisions.
