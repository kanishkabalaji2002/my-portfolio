/**
 * Public Vercel Blob prefix for migrated Cloudinary videos.
 *
 * If videos fail everywhere with 403 and body “Your store is blocked”, the Blob store
 * needs to be unblocked in the Vercel dashboard (or assets must be hosted under `/public`).
 */
export const PUBLIC_BLOB_VIDEO_BASE =
  "https://dp03rp1jubcqskjz.public.blob.vercel-storage.com/cloudinary-migrate";

/** Full URL for a file under `cloudinary-migrate/` (pass filename only). */
export function publicBlobVideo(fileName: string): string {
  return `${PUBLIC_BLOB_VIDEO_BASE}/${fileName}`;
}
