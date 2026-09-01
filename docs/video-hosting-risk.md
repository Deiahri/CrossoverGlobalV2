# Known risk: video is served from Sanity file assets

**Status:** accepted, deliberately. Recorded here so it is a known trade-off, not a surprise.

## What we did

The Strapi migration uploaded all media to Sanity, including video. Videos become
Sanity **file assets** (`fileItem` in `studio/schemaTypes/objects/mediaItems.ts`) and the
site plays them with plain `<video src="https://cdn.sanity.io/...">` tags, exactly as the
Strapi version did.

## Why that is a risk

Sanity's own guidance is explicit:

> Do not store or serve video from Sanity `file` assets for production playback. File
> assets are delivered as raw downloads with no transcoding or adaptive streaming, and
> video traffic drives very high bandwidth usage and unexpectedly large bills.

Two things make this sharper on our setup:

1. **No adaptive streaming.** Every viewer downloads the full-resolution original. A phone
   on a slow connection pulls the same 38.7 MB file a desktop does.
2. **The free plan has a hard cap, not a bill.** Free-tier quotas are blocked when
   exceeded, not charged as overage. Hitting the bandwidth limit means **assets stop
   being served** — images included — until the quota resets or the plan is upgraded.
   The failure mode is a visibly broken site, not an invoice.

## The numbers

| | |
|---|---|
| Videos migrated | 16 |
| Video bytes | ~120 MB of the ~140 MB total |
| Largest single file | 38.7 MB (`2024CO_v (1).mp4`) |
| Free-tier bandwidth | 100 GB / month, hard cap |

Rough thresholds, video alone:

- The 38.7 MB clip hits 100 GB at about **2,600 full plays**.
- If a visitor to a project page loads ~10 MB of video, ~**10,000 page views/month**
  exhausts the quota.

That is comfortable for current traffic and *not* comfortable for a campaign push, an
email blast, or a post that circulates.

## What to watch

Check **Usage** at [sanity.io/manage](https://sanity.io/manage) during any campaign.
If bandwidth trends past ~60 GB in a month, act before the cap.

## If it becomes a problem

In rough order of effort:

1. **Move the heavy clips to YouTube.** Cheapest fix — the site already has
   `_components/YoutubeEmbed.tsx` and every content section already has a `youtubeUrl`
   field. Upload as unlisted, paste the URL, clear the video from `media`. No code change.
2. **Compress before upload.** A 38.7 MB clip re-encoded at a sane web bitrate is often
   under 5 MB. Helps, but does not fix the lack of adaptive streaming.
3. **Move to Mux** via `sanity-plugin-mux-input` for real adaptive streaming with videos
   still managed in the Studio. Needs a Mux account and its own billing.
4. **Upgrade to Growth** ($15/seat/mo), which converts hard caps into pay-as-you-go
   overages. This removes the outage risk but not the cost risk.

## Guardrail already in place

The `fileItem` schema carries a warning in its description, so anyone uploading video in
the Studio sees it at the point of decision.
