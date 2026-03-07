import { glyphs } from "../../../../../../src";
import theme from "@hackclub/theme";

const hackClubColors = theme.colors;

export const runtime = "nodejs";

const normalizeParam = (value) => (Array.isArray(value) ? value[0] || "" : value || "");

const normalizeColor = (rawColor) => {
  let color = normalizeParam(rawColor);

  if (color.startsWith("color:")) color = color.slice(6);

  if (color.startsWith("hackclub-") && hackClubColors[color.slice(9)]) {
    color = hackClubColors[color.slice(9)];
  } else if (color.startsWith("0x") && color.length === 8) {
    color = `#${color.slice(2)}`;
  }

  return color || "currentColor";
};

const normalizeGlyph = (rawGlyph) => {
  let glyph = normalizeParam(rawGlyph);

  if (glyph.startsWith("glyph:")) glyph = glyph.slice(6);
  if (glyph.endsWith(".svg")) glyph = glyph.slice(0, -4);

  return glyph;
};

const escapeXml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const ATTRIBUTE_NAME_MAP = {
  className: "class",
  htmlFor: "for",
  clipRule: "clip-rule",
  fillRule: "fill-rule",
  stopColor: "stop-color",
  stopOpacity: "stop-opacity",
  strokeDasharray: "stroke-dasharray",
  strokeDashoffset: "stroke-dashoffset",
  strokeLinecap: "stroke-linecap",
  strokeLinejoin: "stroke-linejoin",
  strokeMiterlimit: "stroke-miterlimit",
  strokeWidth: "stroke-width",
};

const toAttributeName = (name) => ATTRIBUTE_NAME_MAP[name] || name;

const serializeAttributes = (props = {}) =>
  Object.entries(props)
    .filter(([key, value]) => {
      if (key === "children" || key === "dangerouslySetInnerHTML") return false;
      if (value == null || value === false) return false;
      if (typeof value === "function") return false;
      if (typeof value === "object") return false;
      return true;
    })
    .map(([key, value]) => ` ${toAttributeName(key)}=\"${escapeXml(value)}\"`)
    .join("");

const serializeNode = (node) => {
  if (node == null || typeof node === "boolean") return "";
  if (Array.isArray(node)) return node.map(serializeNode).join("");
  if (typeof node === "string" || typeof node === "number") return escapeXml(node);
  if (typeof node !== "object" || !("type" in node)) return "";

  const { type, props = {} } = node;
  if (typeof type === "symbol") return serializeNode(props.children);
  if (typeof type !== "string") return "";

  const attributes = serializeAttributes(props);
  const innerHtml =
    props.dangerouslySetInnerHTML && props.dangerouslySetInnerHTML.__html != null
      ? String(props.dangerouslySetInnerHTML.__html)
      : serializeNode(props.children);

  if (!innerHtml) return `<${type}${attributes}/>`;
  return `<${type}${attributes}>${innerHtml}</${type}>`;
};

const renderIcon = (glyph, color, size = 256) => {
  const body = serializeNode(glyphs[glyph]);
  const svgAttributes = serializeAttributes({
    fillRule: "evenodd",
    clipRule: "evenodd",
    strokeLinejoin: "round",
    strokeMiterlimit: "1.414",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-label": glyph,
    viewBox: "0 0 32 32",
    preserveAspectRatio: "xMidYMid meet",
    fill: color,
    width: size,
    height: size,
  });
  return `<svg${svgAttributes}>${body}</svg>`;
};

export async function GET(_request, { params }) {
  const { color: rawColor, glyph: rawGlyph } = await params;
  const glyph = normalizeGlyph(rawGlyph);
  const color = normalizeColor(rawColor);

  if (!Object.prototype.hasOwnProperty.call(glyphs, glyph)) {
    return new Response(`Unknown icon glyph: ${glyph}`, {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  return new Response(renderIcon(glyph, color), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
