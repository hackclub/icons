import React from "react";
import PropTypes from "prop-types";
import { standardGlyphs } from "./standardGlyphs";
import { hackclubGlyphs } from "./hackclubGlyphs";

const mergedGlyphs = {
  ...standardGlyphs,
  ...hackclubGlyphs,
};

// keep long-standing glyph names for compatibility
const hasLeaders = Object.prototype.hasOwnProperty.call(mergedGlyphs, "leaders");
const hasLeaderCircle = Object.prototype.hasOwnProperty.call(
  mergedGlyphs,
  "leader-circle"
);
const legacyGlyphs =
  hasLeaders || !hasLeaderCircle
    ? {}
    : { leaders: mergedGlyphs["leader-circle"] };

export const glyphs = {
  ...mergedGlyphs,
  ...legacyGlyphs,
};

export const glyphNames = Object.keys(glyphs);

export type GlyphName = keyof typeof glyphs;

type Props<T extends React.ElementType = "svg"> = {
  is?: T;
  glyph?: keyof typeof glyphs;
  size?: number;
} & Omit<React.ComponentPropsWithoutRef<T>, "children" | "glyph" | "is" | "size">;

function Icon<T extends React.ElementType = "svg">({
  is,
  size = 32,
  glyph = "like",
  ...props
}: Props<T>) {
  const Component = (is ?? "svg") as React.ElementType;

  return React.createElement(
    Component,
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: "1.414",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-label": glyph,
      viewBox: "0 0 32 32",
      preserveAspectRatio: "xMidYMid meet",
      fill: "currentColor",
      width: size,
      height: size,
      ...props,
    },
    glyphs[glyph as keyof typeof glyphs]
  );
}

Icon.propTypes = {
  is: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.elementType,
  ]),
  glyph: PropTypes.oneOf(glyphNames),
  size: PropTypes.number,
};

export default Icon;
