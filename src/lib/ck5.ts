// src/lib/ck5.ts
export function absolutizeMedia(html: string, backendOrigin: string) {
  // Turn src="/media/..." into absolute src="http://localhost:8000/media/..."
  return html.replaceAll('src="/media/', `src="${backendOrigin}/media/`);
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/** If body is plain text (no tags), convert newlines to paragraphs */
export function plainTextToHtml(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return "";
  // Paragraphs separated by blank lines, single \n becomes <br>
  const paras = trimmed
    .split(/\n{2,}/)
    .map((p) => `<p>${escapeHtml(p).replace(/\n/g, "<br>")}</p>`);
  return paras.join("");
}

/** Best-effort prepare pipeline for CK5 body */
export function prepareCk5Html(
  raw: string | null | undefined,
  backendOrigin: string
) {
  if (!raw) return "";
  const looksLikeHtml = /<\w+[\s>]/.test(raw);
  const html = looksLikeHtml ? raw : plainTextToHtml(raw);
  return absolutizeMedia(html, backendOrigin);
}
