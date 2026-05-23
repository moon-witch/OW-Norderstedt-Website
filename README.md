# Offene Werkstatt Norderstedt Website

SvelteKit website for `ow-norderstedt.de`, prepared for deployment on a self-hosted Coolify instance and structured so content can move to Directus without rewriting the page layer.

## Stack

- `SvelteKit` with `adapter-node`
- optional `Directus` content source
- deployable on Coolify with the included `nixpacks.toml`

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
node build/index.js
```

## Environment

Copy `.env.example` to `.env` if you want to point the site at Directus.

```bash
DIRECTUS_URL=https://directus.example.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=mailer@example.com
SMTP_PASS=secret
SMTP_FROM=website@example.com
SMTP_TO=moin@ow-norderstedt.de
```

If `DIRECTUS_URL` is missing or the expected Directus collections are not available yet, the app falls back to a local starter content seed.

If the SMTP values are configured, every registration and request form submission is sent to `moin@ow-norderstedt.de`.

## Suggested Directus model

This frontend is structured around a small content model:

1. `site_settings` singleton
   - `title`
   - `eyebrow`
   - `hero_title`
   - `hero_text`
   - `visitor_hours`
   - `member_hours`
   - `address`
   - `map_url`
   - `email`
   - `mastodon_url`
   - `footer_note`

2. `offers`
   - `slug`
   - `title`
   - `audience`
   - `schedule`
   - `description`
   - `detail`
   - `image`
   - `cta_label`
   - `cta_href`
   - `sort`

3. `workshops`
   - `slug`
   - `title`
   - `date_label`
   - `time_label`
   - `audience`
   - `level`
   - `summary`
   - `image`
   - `cta_label`
   - `cta_href`
   - `sort`

4. `machines`
   - `name`
   - `note`
   - `age_requirement`
   - `sort`

5. `gallery_images`
   - `title`
   - `caption`
   - `image`
   - `sort`

6. `documents`
   - `label`
   - `href`
   - `sort`

7. `stats`
   - `value`
   - `label`
   - `sort`

The current implementation already uses these shapes in TypeScript so the swap is mostly mapping work.

## Coolify

For a Node deployment in Coolify:

- Build command: `pnpm build`
- Start command: `node build/index.js`
- Port: `3000` unless you override it in Coolify

Set `DIRECTUS_URL` in the Coolify environment only after the Directus collections exist.
