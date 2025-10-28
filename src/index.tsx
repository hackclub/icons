import React from "react";
import PropTypes from "prop-types";
import { standardGlyphs } from "./standardGlyphs";
import { hackclubGlyphs } from "./hackclubGlyphs";

export const glyphs = {
  ...standardGlyphs,
  ...hackclubGlyphs,
};

export const glyphNames = Object.keys(glyphs);

export type GlyphName = keyof typeof glyphs;

type Props<T> = {
  is?: React.FunctionComponent | T | string;
  glyph?: keyof typeof glyphs;
  size?: number;
};

function Icon<T extends React.ElementType = "svg">({
  is: Component = "svg",
  size = 32,
  glyph = "like",
  ...props
}: Props<T> & React.ComponentPropsWithoutRef<T>) {
  return (
    <Component
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="1.414"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={glyph}
      viewBox="0 0 32 32"
      preserveAspectRatio="xMidYMid meet"
      fill="currentColor"
      width={size}
      height={size}
      children={glyphs[glyph as keyof typeof glyphs]}
      {...props}
    />
  );
}

Icon.propTypes = {
  is: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.element,
  ]),
  glyph: PropTypes.oneOf(glyphNames),
  size: PropTypes.number,
};

export default Icon;
