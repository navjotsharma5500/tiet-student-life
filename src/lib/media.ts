/**
 * ImageKit helpers. All media lives on ImageKit; in production the database stores
 * only the URL + metadata (alt, caption, focal point). We append ImageKit URL
 * transformations (tr=w-…,q-…) so the browser downloads a right-sized file.
 */
export type Media = {
  url: string;
  alt: string;
  caption?: string;
};

export function ik(url: string, width: number, quality = 75): string {
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}tr=${isHeic(url) ? "f-webp," : ""}w-${width},q-${quality}`;
}

/** HEIC is not reliably decodable in browsers; ImageKit must re-encode it. */
const isHeic = (url: string) => /\.heic(\?|$)/i.test(url);

/** Raw (untransformed) fallback URL; HEIC still goes through a WebP re-encode. */
export function rawSrc(url: string): string {
  return isHeic(url) ? `${url}${url.includes("?") ? "&" : "?"}tr=f-webp,q-85` : url;
}

export function ikSrcSet(url: string, widths: number[] = [480, 768, 1080, 1440, 1920]): string {
  return widths.map((w) => `${ik(url, w)} ${w}w`).join(", ");
}

export const LOGO = "https://ik.imagekit.io/7khjnlfow/email-assets/Thapar_Logo.png?updatedAt=1769371086744";
