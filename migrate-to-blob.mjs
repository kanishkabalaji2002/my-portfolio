#!/usr/bin/env node
/**
 * Streams each Cloudinary asset into Vercel Blob (nothing written to local disk).
 * Requires BLOB_READ_WRITE_TOKEN in .env.local (loaded below).
 *
 * Usage: node migrate-to-blob.mjs
 */

import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { put } from "@vercel/blob";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** Unique Cloudinary video URLs to migrate */
const CLOUDINARY_URLS = [
  "https://res.cloudinary.com/dgn5numf3/video/upload/f_mp4,q_auto:eco,w_1280,c_limit/v1777618675/Screen_Recording_2026-04-30_at_11.55.27_PM_ctyu8d.mov",
  "https://res.cloudinary.com/dgn5numf3/video/upload/v1777618675/Screen_Recording_2026-04-30_at_11.55.27_PM_ctyu8d.mov",
  "https://res.cloudinary.com/drajdxssq/video/upload/v1776921046/grok-video-50cd8fed-84da-49ba-bf3b-a26b7327a753_l9mtys.mp4",
  "https://res.cloudinary.com/drajdxssq/video/upload/v1775981309/subtle_hmdhjr.mov",
  "https://res.cloudinary.com/drajdxssq/video/upload/v1776894359/ocean_explorers-2-2_v3fnis.mp4",
  "https://res.cloudinary.com/drajdxssq/video/upload/f_mp4,q_auto:eco/v1776398905/Screen_Recording_2026-04-16_at_1.31.34_PM_sep6pv",
  "https://res.cloudinary.com/drajdxssq/video/upload/v1776398905/Screen_Recording_2026-04-16_at_1.31.34_PM_sep6pv.mov",
  "https://res.cloudinary.com/drajdxssq/video/upload/v1775594076/podcast_lnbopj.mov",
  "https://res.cloudinary.com/drajdxssq/video/upload/f_mp4/v1774641929/iteration_edhnnf.mov",
  "https://res.cloudinary.com/drajdxssq/video/upload/f_mp4/v1774647382/notes_zvfbid.mov",
  "https://res.cloudinary.com/drajdxssq/video/upload/f_mp4/v1774647362/learning_v29gn1.mov",
  "https://res.cloudinary.com/drajdxssq/video/upload/f_mp4/v1774647480/study_mode_xcsgpb.mov",
  "https://res.cloudinary.com/drajdxssq/video/upload/v1776894975/Screen_Recording_2026-04-22_at_2.05.44_AM_oamdkl.mov",
  "https://res.cloudinary.com/drajdxssq/video/upload/f_mp4/v1776289473/Screen_Recording_2026-04-15_at_2.39.42_PM_kewble.mov",
  "https://res.cloudinary.com/drajdxssq/video/upload/v1776289473/Screen_Recording_2026-04-15_at_2.39.42_PM_kewble.mov",
  "https://res.cloudinary.com/drajdxssq/video/upload/f_mp4,q_auto:eco/v1776918550/Screen_Recording_2026-04-22_at_9.23.02_PM_vj0vck",
  "https://res.cloudinary.com/drajdxssq/video/upload/v1776918550/Screen_Recording_2026-04-22_at_9.23.02_PM_vj0vck.mov",
  "https://res.cloudinary.com/drajdxssq/video/upload/f_mp4,q_auto:eco/v1776463924/scoutvideo-2-2_vuhxe7",
  "https://res.cloudinary.com/drajdxssq/video/upload/v1776463924/scoutvideo-2-2_vuhxe7.mov",
  "https://res.cloudinary.com/drajdxssq/video/upload/v1775980351/My_Movie_f5qk2h.mp4",
  "https://res.cloudinary.com/drajdxssq/video/upload/v1775981466/herosectionsignal_zmrx19.mov",
  "https://res.cloudinary.com/drajdxssq/video/upload/v1775982705/insightsboard_xausph.mov",
  "https://res.cloudinary.com/drajdxssq/video/upload/v1775983814/interview_nmtlyw.mov",
  "https://res.cloudinary.com/drajdxssq/video/upload/v1775983486/afterinterview_ccmzwq.mov",
  "https://res.cloudinary.com/drajdxssq/video/upload/v1775548236/addpayment_r0dhz6.mov",
  "https://res.cloudinary.com/drajdxssq/video/upload/v1775548072/herotele_cwwcpy.mov",
];

function loadEnvLocal() {
  const candidates = [join(__dirname, ".env.local"), join(process.cwd(), ".env.local")];
  const path = candidates.find((p) => existsSync(p));
  if (!path) {
    throw new Error(
      `No .env.local found next to this script or in cwd. Tried:\n${candidates.join("\n")}`,
    );
  }
  const text = readFileSync(path, "utf8");
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  }
}

function blobPathnameFromUrl(urlString) {
  const pathParts = new URL(urlString).pathname.split("/").filter(Boolean);
  const last = pathParts[pathParts.length - 1] || "video.bin";
  return `cloudinary-migrate/${last}`;
}

async function main() {
  loadEnvLocal();
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token?.trim()) {
    throw new Error("BLOB_READ_WRITE_TOKEN is missing or empty after loading .env.local");
  }

  console.log("Cloudinary URL\tVercel Blob URL\n");

  for (const oldUrl of CLOUDINARY_URLS) {
    const res = await fetch(oldUrl);
    if (!res.ok) {
      throw new Error(`Fetch failed (${res.status} ${res.statusText}): ${oldUrl}`);
    }
    const body = res.body;
    if (!body) {
      throw new Error(`No response body for: ${oldUrl}`);
    }

    const pathname = blobPathnameFromUrl(oldUrl);
    const contentType =
      res.headers.get("content-type")?.split(";")[0]?.trim() || "application/octet-stream";

    const result = await put(pathname, body, {
      access: "public",
      allowOverwrite: true,
      token,
      contentType,
      multipart: true,
    });

    console.log(`${oldUrl}\t${result.url}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
