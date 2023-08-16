# `@hackclub/icons`

Hack Club’s icons are a superset of [Spectrum](https://spectrum.chat)’s incredible collection (also published as [`spectrum-icons`](https://github.com/lachlanjc/spectrum-icons)). Designed for use with our [Design System](https://github.com/hackclub/design-system).

[See them all](https://hackclub-icons.now.sh)

## Usage

### With React

```sh
npm i @hackclub/icons
```

```js
import React from 'react'
import Icon from '@hackclub/icons'

export default () => (
  <div style={{ color: 'cyan' }}>
    <Icon glyph="clubs" size={128} />
    <Icon glyph="bank-circle" size={64} />
    <Icon glyph="leaders" size={32} />
  </div>
)
```

### With the API

`https://icons.hackclub.com/api/icons/:color/:glyph`
 - `:glyph` - A glyph from [icons.hackclub.com](https://icons.hackclub.com).
 - `:color` - Any valid HTML color or [Hack Club Theme](https://theme.hackclub.com) color prefixed with `hackclub-`. Replace `#` with `0x` when using a hexadecimal color.

All responses are SVGs with the MIME type `image/svg+xml`. You can optionally include the .svg file extension.

Examples:

```html
<img src="https://icons.hackclub.com/api/icons/red/clubs">
<img src="https://icons.hackclub.com/api/icons/hackclub-green/battery-bolt">
<img src="https://icons.hackclub.com/api/icons/0xc78ad4/sam.svg">
```

### In Figma

Copy and paste the Hack Club Icon component from the Figma file: [figma.com/file/u8evOObGA4HCzUKlrVra1q/Hack-Club-Icon-Component](https://www.figma.com/file/u8evOObGA4HCzUKlrVra1q/Hack-Club-Icon-Component)

Choose the icon you'd like by modifying the `Glyph`.

## Development Setup

1. Clone & enter the repo.

```sh
$ git clone https://github.com/hackclub/icons.git
$ cd icons
```

2. Install dependencies.

```sh
$ yarn
```

3. Build library.

```sh
yarn run prepare
```

4. Run docs locally.

```sh
yarn run dev
```

## Adding an icon

If you’d like to add an icon, the Figma file is [Hack Club Icons](https://www.figma.com/file/H2wiriGOtV3txSx6fwVTwsPz/Hack-Club-icons?node-id=0%3A1&t=m5yDilUsUNQxrUUu-1). Try to design the icon only out of components of other icons, to keep consistency high, with those small square canvas sizes. When you’re done, clone your new icon, flatten all the layers into one shape for the simplest/smallest code/rendering, then export as an SVG with no background. Open the file, copy the `<path>`, then in the Icon source file, add a new one (alphabetically), using a wrapping `<g>` if you have several `<path>`s. Make sure to remove the fill attribute from all paths, & ensure you’re formatting props correctly as JSX (replacing hyphens with camelCase).

After publishing, remember to update the package dependency on the docs site so it’s showing the latest iconset.
