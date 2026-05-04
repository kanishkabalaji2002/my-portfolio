const RESUME_DRIVE_FILE_ID = "1Wi-JJnj_sCc7eBWzbIc9209QFb-eRGpC";

/** Optional Google Doc (edit URL). Navbar “Download” uses `RESUME_PDF_URL` (Drive PDF). */
export const RESUME_GOOGLE_DOC_URL =
  "https://docs.google.com/document/d/1R_CgbXPtVohxNPUwhmyRuKLphkYnnmmMxsvZwMk9Eow/edit?usp=sharing";

/** Drive viewer (share link) — navbar “Download” and other PDF links. */
export const RESUME_PDF_URL = `https://drive.google.com/file/d/${RESUME_DRIVE_FILE_ID}/view?usp=sharing`;

/** Same file, plain `/view` URL (navbar “Download” target). */
export const RESUME_DRIVE_VIEW_URL = `https://drive.google.com/file/d/${RESUME_DRIVE_FILE_ID}/view`;

/**
 * Triggers a file download from Google Drive (may show Drive’s “scan” interstitial for large files).
 * @see https://drive.google.com/uc?export=download&id=…
 */
export const RESUME_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${RESUME_DRIVE_FILE_ID}`;
