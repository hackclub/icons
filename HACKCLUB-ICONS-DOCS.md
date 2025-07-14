# 🎨 Hack Club Icons - Font Awesome Style

A Font Awesome-style icon library for Hack Club's complete icon set. Use any of the 204 Hack Club icons as easily as Font Awesome icons!

## 🚀 Quick Start

### 1. Include the Library

```html
<script src="hackclub-icons.js"></script>
```

### 2. Use Icons in HTML

```html
<!-- Custom element (recommended) -->
<hc-icon glyph="clubs" size="24"></hc-icon>
<hc-icon glyph="github" size="32" color="#333"></hc-icon>

<!-- Class-based replacement -->
<div class="hc-icon" data-glyph="analytics" data-size="24"></div>
```

### 3. Use Icons in JavaScript

```javascript
// Create icons programmatically
const icon = HackClubIcons.create('bolt', { size: '24', color: '#007acc' });
document.body.appendChild(icon);
```

## 📖 Usage Guide

### Custom Elements (Recommended)

The easiest way to use icons is with the `<hc-icon>` custom element:

```html
<hc-icon glyph="clubs"></hc-icon>
<hc-icon glyph="analytics" size="32"></hc-icon>
<hc-icon glyph="github" size="28" color="#333"></hc-icon>
<hc-icon glyph="code" size="24" color="#007acc"></hc-icon>
```

#### Attributes

- `glyph` (required): The icon name (see available icons below)
- `size` (optional): Icon size in pixels (default: 24)
- `color` (optional): Icon color (default: currentColor)

### Class-based Replacement

For cases where you can't use custom elements:

```html
<div class="hc-icon" data-glyph="apple" data-size="24"></div>
<div class="hc-icon" data-glyph="briefcase" data-size="28" data-color="#ec3750"></div>
```

The library automatically replaces elements with the `hc-icon` class on page load.

### JavaScript API

#### `HackClubIcons.getGlyphs()`
Get an array of all available glyph names.

```javascript
const glyphs = HackClubIcons.getGlyphs();
console.log(glyphs); // ['admin', 'analytics', 'apple', ...]
```

#### `HackClubIcons.create(glyph, options)`
Create an icon element programmatically.

```javascript
const icon = HackClubIcons.create('clubs', {
    size: '32',
    color: '#ec3750',
    className: 'my-icon',
    id: 'my-icon-id'
});
document.body.appendChild(icon);
```

**Options:**
- `size` (string): Icon size in pixels
- `color` (string): Icon color
- `className` (string): CSS class name
- `id` (string): Element ID

#### `HackClubIcons.getSvg(glyph, options)`
Get the SVG string for an icon.

```javascript
const svg = HackClubIcons.getSvg('github', { 
    size: '24', 
    color: '#333' 
});
console.log(svg); // '<svg width="24" height="24" ...>'
```

#### `HackClubIcons.replace(selector)`
Replace elements matching the selector with icons.

```javascript
HackClubIcons.replace('.my-icon-class');
```

## 🎯 Available Icons

The library includes all 204 icons from the Hack Club icon set:

### Popular Icons
- `clubs` - Hack Club logo
- `analytics` - Analytics/charts
- `github` - GitHub logo
- `code` - Code brackets
- `bolt` - Lightning bolt
- `bag` - Shopping bag
- `briefcase` - Briefcase
- `checkmark` - Checkmark
- `apple` - Apple logo
- `android` - Android logo

### Categories

**UI/UX Icons**
- `admin`, `analytics`, `announcement`, `attachment`, `checkbox`, `checkmark`, `code`, `copy`, `delete`, `edit`, `search`, `settings`, `star`, `support`, `trash`, `user`

**Social Media**
- `bitbucket`, `discord`, `facebook`, `github`, `gitlab`, `instagram`, `linkedin`, `twitter`, `youtube`

**Development**
- `javascript`, `kotlin`, `typescript`, `flutter`, `swift`, `android`, `apple`, `windows`, `linux`

**System**
- `battery`, `bolt`, `briefcase`, `bug`, `card`, `clipboard`, `download`, `file`, `folder`, `gear`, `home`, `lock`, `mail`, `notification`, `phone`, `print`, `save`, `share`, `upload`, `wifi`

**E-commerce**
- `bag`, `bank`, `card`, `payment`, `purse`, `shirt`, `transactions`

**Communication**
- `email`, `message`, `notification`, `reply`, `send`, `support`, `phone`, `chat`

[See the complete list in the test.html file]

## 🎨 Styling

### CSS Customization

Icons inherit the current text color by default. You can style them with CSS:

```css
.my-icon {
    color: #ec3750;
    width: 32px;
    height: 32px;
}

.my-icon:hover {
    color: #007acc;
}
```

### Responsive Icons

```css
.responsive-icon {
    width: 1.5em;
    height: 1.5em;
}
```

## 💡 Examples

### Navigation Menu

```html
<nav>
    <a href="/"><hc-icon glyph="home" size="20"></hc-icon> Home</a>
    <a href="/code"><hc-icon glyph="code" size="20"></hc-icon> Code</a>
    <a href="/analytics"><hc-icon glyph="analytics" size="20"></hc-icon> Analytics</a>
    <a href="/settings"><hc-icon glyph="settings" size="20"></hc-icon> Settings</a>
</nav>
```

### Button with Icon

```html
<button class="btn">
    <hc-icon glyph="download" size="16"></hc-icon>
    Download
</button>
```

### Dynamic Icons

```javascript
// Change icon based on state
function toggleIcon(element, isActive) {
    const icon = element.querySelector('hc-icon');
    icon.setAttribute('glyph', isActive ? 'checkmark' : 'checkbox');
    icon.setAttribute('color', isActive ? '#33d9b2' : '#666');
}
```

### Icon Grid/Showcase

```javascript
// Display all icons
const container = document.getElementById('icon-container');
const glyphs = HackClubIcons.getGlyphs();

glyphs.forEach(glyph => {
    const item = document.createElement('div');
    item.innerHTML = `
        <hc-icon glyph="${glyph}" size="24"></hc-icon>
        <span>${glyph}</span>
    `;
    container.appendChild(item);
});
```

## 🔧 Technical Details

### Browser Support
- Modern browsers with custom element support
- Fallback for older browsers through polyfills

### Performance
- Lazy loading of icon definitions
- Efficient SVG rendering
- Minimal DOM manipulation

### File Size
- Complete library: ~200KB (minified)
- Individual icons: ~1-3KB each
- No external dependencies

## 📦 Integration

### With React
```jsx
function MyComponent() {
    return (
        <div>
            <hc-icon glyph="clubs" size="24" />
            <hc-icon glyph="github" size="20" color="#333" />
        </div>
    );
}
```

### With Vue
```vue
<template>
    <div>
        <hc-icon glyph="analytics" size="24" />
        <hc-icon glyph="code" size="20" color="#007acc" />
    </div>
</template>
```

### With Angular
```typescript
// In component
export class MyComponent {
    ngOnInit() {
        // Icons work automatically
    }
}
```

```html
<!-- In template -->
<hc-icon glyph="bolt" size="24"></hc-icon>
```

## 🛠️ Development

### File Structure
```
hackclub-icons.js          # Main library file
test.html                  # Test/demo page
HACKCLUB-ICONS-DOCS.md     # This documentation
```

### Contributing
The icon library is generated from the main Hack Club icons repository. To add new icons:

1. Add icons to the main repository
2. Regenerate the icon library
3. Update documentation

## 📄 License

This library uses icons from the Hack Club icon set. Please refer to the original repository for licensing information.

## 🎉 Credits

- **Icon Design**: Hack Club community and contributors
- **Original Icons**: Based on Spectrum's icon collection
- **Library Implementation**: Built for easy web integration

---

Made with ❤️ for the Hack Club community