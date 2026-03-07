#!/usr/bin/env node

const React = require("react");

let exitCode = 0;
let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ✅ ${name}`);
  } catch (err) {
    failed++;
    exitCode = 1;
    console.error(`  ❌ ${name}`);
    console.error(`     ${err.message}`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

// ---------------------------------------------------------------------------
// Load the built package
// ---------------------------------------------------------------------------

let dist;
try {
  dist = require("../dist");
} catch (err) {
  console.error("❌ Could not load dist/index.js — did you run `yarn prepare`?");
  console.error(`   ${err.message}`);
  process.exit(1);
}

const { glyphs, glyphNames, default: Icon } = dist;

// ---------------------------------------------------------------------------
// 1. Exports
// ---------------------------------------------------------------------------

console.log("Exports:");

test("glyphs is a non-empty object", () => {
  assert(typeof glyphs === "object" && glyphs !== null, "glyphs is not an object");
  assert(Object.keys(glyphs).length > 0, "glyphs is empty");
});

test("glyphNames is a non-empty array", () => {
  assert(Array.isArray(glyphNames), "glyphNames is not an array");
  assert(glyphNames.length > 0, "glyphNames is empty");
});

test("glyphNames matches Object.keys(glyphs)", () => {
  const keys = Object.keys(glyphs);
  assert(
    keys.length === glyphNames.length &&
      keys.every((k) => glyphNames.includes(k)),
    `glyphNames (${glyphNames.length}) does not match glyphs keys (${keys.length})`
  );
});

test("Icon default export is a function", () => {
  assert(typeof Icon === "function", `Icon is ${typeof Icon}, expected function`);
});

// ---------------------------------------------------------------------------
// 2. Glyph resolution — every name maps to a valid React element
// ---------------------------------------------------------------------------

console.log(`\nGlyph resolution (${glyphNames.length} icons):`);

const invalidGlyphs = [];

for (const name of glyphNames) {
  const value = glyphs[name];
  if (!React.isValidElement(value)) {
    invalidGlyphs.push(name);
  }
}

test("all glyphs resolve to valid React elements", () => {
  assert(
    invalidGlyphs.length === 0,
    `${invalidGlyphs.length} glyph(s) are not valid React elements: ${invalidGlyphs.join(", ")}`
  );
});

// ---------------------------------------------------------------------------
// 3. Known icon subsets — ensure expected icons from each source exist
// ---------------------------------------------------------------------------

console.log("\nKnown icon subsets:");

const expectedStandard = [
  "like",
  "search",
  "home",
  "settings",
  "notification",
  "email",
];
const missingStandard = expectedStandard.filter((n) => !(n in glyphs));

test("standard (Supercon) icons are present", () => {
  assert(
    missingStandard.length === 0,
    `Missing standard icons: ${missingStandard.join(", ")}`
  );
});

const expectedHackClub = [
  "bank-account",
  "bank-circle",
  "clubs-fill",
  "leader-circle",
];
const missingHackClub = expectedHackClub.filter((n) => !(n in glyphs));

test("custom Hack Club icons are present", () => {
  assert(
    missingHackClub.length === 0,
    `Missing Hack Club icons: ${missingHackClub.join(", ")}`
  );
});

// ---------------------------------------------------------------------------
// 4. Legacy aliases
// ---------------------------------------------------------------------------

console.log("\nLegacy aliases:");

test("'leaders' alias resolves (maps to leader-circle)", () => {
  assert("leaders" in glyphs, "'leaders' alias is missing from glyphs");
  assert(
    glyphs["leaders"] === glyphs["leader-circle"],
    "'leaders' does not point to 'leader-circle'"
  );
});

// ---------------------------------------------------------------------------
// 5. Icon component rendering
// ---------------------------------------------------------------------------

console.log("\nIcon component rendering:");

test("Icon renders with default glyph", () => {
  const el = React.createElement(Icon);
  assert(React.isValidElement(el), "Icon() did not return a valid React element");
});

test("Icon renders with each glyph name", () => {
  const renderErrors = [];
  for (const name of glyphNames) {
    try {
      const el = React.createElement(Icon, { glyph: name });
      assert(React.isValidElement(el), "not a valid element");
    } catch (err) {
      renderErrors.push(name);
    }
  }
  assert(
    renderErrors.length === 0,
    `${renderErrors.length} glyph(s) failed to render: ${renderErrors.join(", ")}`
  );
});

test("Icon accepts size prop", () => {
  const el = React.createElement(Icon, { glyph: "like", size: 64 });
  assert(el.props.size === 64, "size prop was not passed through");
});

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------

console.log(`\n${"—".repeat(40)}`);
console.log(`Total: ${passed + failed}  Passed: ${passed}  Failed: ${failed}`);
console.log(`Icons: ${glyphNames.length}`);
console.log(`${"—".repeat(40)}\n`);

process.exit(exitCode);
