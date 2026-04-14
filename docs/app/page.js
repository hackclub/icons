import { glyphNames } from "../../src";
import IconGallery from "./IconGallery";

const hidden = new Set(["sus", "android"]);
const visibleGlyphNames = [...glyphNames]
  .filter((glyph) => !hidden.has(glyph))
  .sort();

export default function Page() {
  return (
    <main>
      <h1>
        @hackclub/<span>icons</span>
      </h1>
      <nav>
        <a href="https://github.com/hackclub/icons">GitHub</a>
        <a href="https://npmjs.com/package/@hackclub/icons">npm</a>
        <a href="https://www.figma.com/file/u8evOObGA4HCzUKlrVra1q/Hack-Club-Icon-Component">
          Figma
        </a>
      </nav>
      <IconGallery glyphs={visibleGlyphNames} />
    </main>
  );
}
