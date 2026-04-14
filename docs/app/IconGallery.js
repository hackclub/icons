"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "../../src";

export default function IconGallery({ glyphs }) {
  const [copiedGlyph, setCopiedGlyph] = useState(null);
  const timeoutRef = useRef(null);
  const svgCacheRef = useRef(new Map());

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function showCopied(glyph) {
    setCopiedGlyph(glyph);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopiedGlyph(null), 1500);
  }

  async function csvg(glyph) {
    let svg = svgCacheRef.current.get(glyph);

    try {
      if (!svg) {
        const response = await fetch(
          `/api/icons/${encodeURIComponent("currentColor")}/${encodeURIComponent(glyph)}.svg`
        );

        if (!response.ok) {
          throw new Error(`Failed to load SVG for ${glyph}`);
        }

        svg = await response.text();
        svgCacheRef.current.set(glyph, svg);
      }

      await navigator.clipboard.writeText(svg);
      showCopied(glyph);
    } catch (error) {
      console.error("Failed to copy SVG", error);
    }
  }

  async function cname(glyph) {
    try {
      await navigator.clipboard.writeText(glyph);
      showCopied(glyph);
    } catch (error) {
      console.error("Failed to copy glyph name", error);
    }
  }

  return (
    <article>
      {glyphs.map((glyph) => {
        const copied = copiedGlyph === glyph;

        return (
          <div key={glyph} className={`icon-card${copied ? " is-copied" : ""}`}>
            <span className="icon-card-toast" aria-live="polite">
              {copied ? "Copied!" : ""}
            </span>
            <button
              type="button"
              className="icon-card-icon"
              onClick={() => csvg(glyph)}
              aria-label={`Copy SVG for ${glyph}`}
              title={copied ? `Copied ${glyph}` : `Copy SVG for ${glyph}`}
            >
              <Icon glyph={glyph} title={glyph} size={44} />
            </button>
            <button
              type="button"
              className="icon-card-name"
              onClick={() => cname(glyph)}
              aria-label={`Copy "${glyph}"`}
              title={`Copy name: ${glyph}`}
            >
              {glyph}
            </button>
          </div>
        );
      })}
    </article>
  );
}
