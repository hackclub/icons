import React from 'react'
import Head from 'next/head'
import Icon, { glyphNames } from '../dist/index'

const title = '@hackclub/icons'
const description = 'Hack Club’s iconset, published on npm as React components.'

export default () => (
  <main>
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />
      <meta name="og:url" content="https://hackclub-icons.now.sh" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={title} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />
    </Head>
    <style jsx global>{`
      body {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
          Roboto, 'Helvetica Neue', sans-serif;
      }
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
      {glyphNames.sort().map(key => (
        <div key={key}>
          <Icon glyph={key} title={key} size={48} />
          <p children={key} />
        </div>
      ))}
    </article>
  </main>
)
