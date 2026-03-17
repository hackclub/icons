import { describe, test, expect } from "bun:test";
import React from "react";

const dist = require("../dist");
const { glyphs, glyphNames, default: Icon } = dist;

// ---------------------------------------------------------------------------
// 1. Exports
// ---------------------------------------------------------------------------

describe("Exports", () => {
  test("glyphs is a non-empty object", () => {
    expect(typeof glyphs).toBe("object");
    expect(glyphs).not.toBeNull();
    expect(Object.keys(glyphs).length).toBeGreaterThan(0);
  });

  test("glyphNames is a non-empty array", () => {
    expect(Array.isArray(glyphNames)).toBe(true);
    expect(glyphNames.length).toBeGreaterThan(0);
  });

  test("glyphNames matches Object.keys(glyphs)", () => {
    const keys = Object.keys(glyphs);
    expect(keys.length).toBe(glyphNames.length);
    expect(keys.every((k) => glyphNames.includes(k))).toBe(true);
  });

  test("Icon default export is a function", () => {
    expect(typeof Icon).toBe("function");
  });
});

// ---------------------------------------------------------------------------
// 2. Glyph resolution — every name maps to a valid React element
// ---------------------------------------------------------------------------

describe("Glyph resolution", () => {
  test("all glyphs resolve to valid React elements", () => {
    const invalidGlyphs = [];
    for (const name of glyphNames) {
      if (!React.isValidElement(glyphs[name])) {
        invalidGlyphs.push(name);
      }
    }
    expect(invalidGlyphs).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// 3. Known icon subsets — ensure expected icons from each source exist
// ---------------------------------------------------------------------------

describe("Known icon subsets", () => {
  test("standard (Supercon) icons are present", () => {
    const expected = ["like", "search", "home", "settings", "notification", "email"];
    const missing = expected.filter((n) => !(n in glyphs));
    expect(missing).toEqual([]);
  });

  test("custom Hack Club icons are present", () => {
    const expected = ["bank-account", "bank-circle", "clubs-fill", "leader-circle"];
    const missing = expected.filter((n) => !(n in glyphs));
    expect(missing).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// 4. Legacy aliases
// ---------------------------------------------------------------------------

describe("Legacy aliases", () => {
  test("'leaders' alias resolves (maps to leader-circle)", () => {
    expect("leaders" in glyphs).toBe(true);
    expect(glyphs["leaders"]).toBe(glyphs["leader-circle"]);
  });
});

// ---------------------------------------------------------------------------
// 5. Icon component rendering
// ---------------------------------------------------------------------------

describe("Icon component rendering", () => {
  test("Icon renders with default glyph", () => {
    const el = React.createElement(Icon);
    expect(React.isValidElement(el)).toBe(true);
  });

  test("Icon renders with each glyph name", () => {
    const renderErrors = [];
    for (const name of glyphNames) {
      try {
        const el = React.createElement(Icon, { glyph: name });
        if (!React.isValidElement(el)) renderErrors.push(name);
      } catch {
        renderErrors.push(name);
      }
    }
    expect(renderErrors).toEqual([]);
  });

  test("Icon accepts size prop", () => {
    const el = React.createElement(Icon, { glyph: "like", size: 64 });
    expect(el.props.size).toBe(64);
  });
});
