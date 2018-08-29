import React from 'react'
import Icon, { glyphNames } from '../dist/index.js'

export default () => (
  <main>
    <style>{`
    body {
      font-size: 12px;
      text-align: center;
    }
    main {
      width: 100%;
      max-width: 1024px;
      padding: 32px;
      margin: auto;
    }
    h1 {
      font-size: 24px;
      font-weight: bold;
    }
    nav a {
      font-size: 16px;
      margin: 0 16px;
      color: #333;
    }
    nav a:hover {
      color: #666;
    }
    article {
      margin-top: 48px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(64px, 1fr));
      grid-gap: 16px;
      justify-content: center;
    }
    p {
      color: #666;
      line-height: 1.25;
      font-family: SFMono-Regular, Menlo, monospace;
      word-break: break-word;
      word-wrap: wrap;
    }
  `}</style>
    <h1>@hackclub/icons</h1>
    <nav>
      <a href="https://github.com/hackclub/icons">GitHub</a>
      <a href="https://npmjs.com/package/@hackclub/icons">npm</a>
    </nav>
    <article>
      {glyphNames.sort().map(key => (
        <div key={key}>
          <Icon glyph={key} title={key} size={48} />
          <p children={key} />
        </div>
      ))}
    </article>
  </main>
)
