const fs = require('fs');

// Read the file
const content = fs.readFileSync('/workspaces/icons/src/index.tsx', 'utf8');

// Extract the glyphs object
const glyphsMatch = content.match(/export const glyphs = \{([\s\S]*?)\n\};/);
if (!glyphsMatch) {
  console.error('Could not find glyphs object');
  process.exit(1);
}

const glyphsContent = glyphsMatch[1];

// Parse individual glyphs
const glyphs = {};
const glyphRegex = /^  ([a-zA-Z0-9_-]+|"[^"]+"):\s*\(([\s\S]*?)\n  \),?$/gm;

let match;
while ((match = glyphRegex.exec(glyphsContent)) !== null) {
  const glyphName = match[1].replace(/"/g, ''); // Remove quotes if present
  let glyphContent = match[2];
  
  // Convert JSX attributes to standard SVG attributes
  glyphContent = glyphContent
    .replace(/fillRule=/g, 'fill-rule=')
    .replace(/clipRule=/g, 'clip-rule=')
    .replace(/strokeWidth=/g, 'stroke-width=')
    .replace(/strokeLinecap=/g, 'stroke-linecap=')
    .replace(/strokeLinejoin=/g, 'stroke-linejoin=')
    .replace(/strokeMiterlimit=/g, 'stroke-miterlimit=')
    .replace(/strokeDasharray=/g, 'stroke-dasharray=')
    .replace(/strokeDashoffset=/g, 'stroke-dashoffset=')
    .replace(/strokeOpacity=/g, 'stroke-opacity=')
    .replace(/fillOpacity=/g, 'fill-opacity=')
    .replace(/className=/g, 'class=');
  
  glyphs[glyphName] = glyphContent.trim();
}

// Output the result
console.log('const glyphs = {');
Object.keys(glyphs).sort().forEach(key => {
  console.log(`  "${key}": (\n    ${glyphs[key].replace(/\n/g, '\n    ')}\n  ),`);
});
console.log('};');

console.error(`\nExtracted ${Object.keys(glyphs).length} glyphs`);