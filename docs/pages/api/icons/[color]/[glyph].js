import React from "react";
import ReactDOMServer from "react-dom/server";
import Icon, { glyphs } from "@hackclub/icons";
import theme from "@hackclub/theme";

const hackClubColors = theme.colors;

const normalizeParam = (value) =>
  Array.isArray(value) ? value[0] || "" : value || "";

const normalizeColor = (rawColor) => {
  let color = normalizeParam(rawColor);

  if (color.startsWith("color:")) color = color.substring(6);

  if (color.startsWith("hackclub-") && hackClubColors[color.substring(9)]) {
    color = hackClubColors[color.substring(9)];
  } else if (color.startsWith("0x") && color.length === 8) {
    color = `#${color.substring(2)}`;
  }

  return color || "currentColor";
};

const normalizeGlyph = (rawGlyph) => {
  let glyph = normalizeParam(rawGlyph);

  if (glyph.startsWith("glyph:")) glyph = glyph.substring(6);
  if (glyph.endsWith(".svg")) glyph = glyph.substring(0, glyph.length - 4);

  return glyph;
};

const renderIcon = (glyph, color, size = 256) =>
  ReactDOMServer.renderToStaticMarkup(
    <Icon glyph={glyph} size={size} fill={color} />
  );

export default async function handler(request, response) {
  const glyph = normalizeGlyph(request.query.glyph);
  const color = normalizeColor(request.query.color);

  if (!Object.prototype.hasOwnProperty.call(glyphs, glyph)) {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/plain");
    response.end(`Unknown icon glyph: ${glyph}`);
    return;
  }

  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Content-Type", "image/svg+xml");
  response.setHeader("Cache-Control", "s-maxage=86400");
  response.end(renderIcon(glyph, color));
}

// What a request should look like:
// https://icons.hackclub.com/api/icons/color:red/glyph:channels.svg
