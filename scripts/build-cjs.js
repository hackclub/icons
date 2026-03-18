const fs = require("fs");

fs.writeFileSync(
  "dist/index.js",
  `"use strict";
const m = require("./esm/index.js");
module.exports = { ...m, default: m.default };
`
);

fs.writeFileSync(
  "dist/index.d.ts",
  `import * as _exports from "./esm/index.js";
export = _exports;
`
);
