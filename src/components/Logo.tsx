"use client";

import { LOGO, ik } from "@/lib/media";
import { retryRaw } from "./motion";

/** TIET crest with raw-URL retry. */
export function Logo({ width = 360, className = "", alt = "Thapar Institute of Engineering & Technology", lazy = false }: { width?: number; className?: string; alt?: string; lazy?: boolean }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={ik(LOGO, width, 90)} onError={retryRaw(LOGO)} alt={alt} className={className} loading={lazy ? "lazy" : undefined} />;
}
