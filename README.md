# `@hackclub/icons`

Hack Club’s icons are a superset of [Spectrum](https://spectrum.chat)’s incredible collection (also published as [`spectrum-icons`](https://github.com/lachlanjc/spectrum-icons)). Designed for use with our [Design System](https://github.com/hackclub/design-system).

[See them all](https://hackclub-icons.now.sh)

## Usage

```sh
npm i @hackclub/icons
```

```js
import React from 'react'
import Icon from '@hackclub/icons'

export default () => (
  <div style={{ color: 'hotpink' }}>
    <Icon glyph="challenge" size={128} />
    <Icon glyph="event-code" size={64} />
    <Icon glyph="important" size={32} />
  </div>
)
```

## Development Setup

1. Clone & enter the repo.

```sh
$ git clone https://github.com/hackclub/icons.git
$ cd icons
```

2. Install dependencies.

```sh
$ npm install
```

3. Setup docs (optional, do this if you’ve added icons).

```sh
npm run prepare
npm run docs
```

4. Run locally.

```sh
npm run dev
```
