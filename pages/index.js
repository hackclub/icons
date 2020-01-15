import React from 'react'
const Icon = require('../dist')
// import Icon from '../dist/index'

export default () => (
  <main>
    <style jsx>{`
      main {
        font-size: 12px;
        text-align: center;
        width: 100%;
        max-width: 1024px;
        padding: 32px;
        margin: auto;
      }
      h1 {
        color: #8b909a;
        font-size: 32px;
        font-weight: 800;
      }
      h1 span {
        color: #ec3750;
      }
      nav a {
        color: #8b909a;
        font-size: 16px;
        font-weight: 600;
        margin: 0 16px;
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
    <h1>
      @hackclub/<span>icons</span>
    </h1>
    <nav>
      <a href="https://github.com/hackclub/icons">GitHub</a>
      <a href="https://npmjs.com/package/@hackclub/icons">npm</a>
    </nav>
    <article>
      {['welcome'].sort().map(key => (
        <div key={key}>
          {/* <Icon glyph={key} title={key} size={48} /> */}
          <p children={key} />
        </div>
      ))}
    </article>
  </main>
)
