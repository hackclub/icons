import Icon, { glyphNames } from "@hackclub/icons";

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
      <article>
        {visibleGlyphNames.map((glyph) => (
          <div key={glyph}>
            <Icon glyph={glyph} title={glyph} size={48} />
            <p>{glyph}</p>
          </div>
        ))}
      </article>
    </main>
  );
}
