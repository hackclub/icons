import React from "react";
import Head from "next/head";
import Icon, { glyphNames } from "@hackclub/icons";
import copy from "copy-to-clipboard";

const title = "@hackclub/icons";
const description =
  "Hack Club’s iconset as React components, published on npm as @hackclub/icons.";

const hidden = ["sus", "android"];

let timer = null;

function copyToClipboard(str) {
  const copyEl = document.querySelector(".copy");
  copy(str);
  copyEl.classList.add("copied");
  if(!timer) {
    timer = setTimeout(() => copyEl.classList.remove("copied"), 1000);
  }else {
    clearTimeout(timer);
    timer = setTimeout(() => copyEl.classList.remove("copied"), 1000);
  }
}

const Docs = () => (
  <main>
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />
      <meta name="og:url" content="https://icons.hackclub.com" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={title} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />
    </Head>
    <style jsx global>{`
      body {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
          Roboto, "Helvetica Neue", sans-serif;
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
        transition: 0.125s ease-in-out;
      }
      nav a:hover {
        color: #ec3750;
      }
      article {
        margin-top: 48px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(64px, 1fr));
        grid-gap: 16px;
        justify-content: center;
      }
      article > div:not(:last-child) { 
        cursor: pointer;
      }
      article > div:not(:last-child) > svg {
        transition: fill 0.125s ease-in-out;
      }
      article > div:not(:last-child) > p{
        transition: color 0.125s ease-in-out;
      }
      article > div:hover > svg {
        fill: #ec3750;
      }
      article > div:hover > p{
        color: #ec3750;
      }
      p {
        color: #8b909a;
        line-height: 1.25;
        font-family: SFMono-Regular, Menlo, monospace;
        word-break: break-word;
        word-wrap: wrap;
      }
      .copy {
        position: fixed;
        z-index: 1;
        top: 50%;
        left: 50%;
        trnasform: translate(-50%, -50%);

        display: flex;
        align-items: center;
        gap: 8px;
        padding: 0 24px;
        border-radius: 5px;
        border: 1px solid #ec3750;
        background-color: #1e1e1e;

        transition: opacity 0.125s ease-in-out;
        opacity: 0;
        visibility: hidden;
      }
      .copy.copied {
        opacity: 1;
        visibility: visible;
      }
      .copy > p {
        color: #ec3750;
        font-size: 16px;
        font-weight: 600;
      }
      .copy > svg {
        fill: #ec3750;
      }
      @media (prefers-color-scheme: dark) {
        body {
          background-color: #1e1e1e;
          color: #fff;
        }
        svg {
          fill: #e1e1e1;
        }
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
      {glyphNames.sort().map(
        (key) =>
          !hidden.includes(key) && (
            <div key={key} onClick={() => copyToClipboard(key)}>
              <Icon glyph={key} title={key} size={48} />
              <p children={key} />
            </div>
          )
      )}
      <div className="copy">
        <Icon glyph="copy-check" title="copy-check" size={24} /> 
        <p>Copied</p>
      </div>
    </article>
  </main>
);

export default Docs;
