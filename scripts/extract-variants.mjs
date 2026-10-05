import fs from 'fs';

const html = fs.readFileSync('checkout_debug.html', 'utf8');

const regex = /variants:\s*(\[[^\]]*\])/g;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log("MATCH:", m[1]);
}

// Let's also search for bundleData or variants
const bdMatch = html.match(/bundleData\s*=\s*(\{[\s\S]*?\});/);
if (bdMatch) {
  console.log("bundleData match:", bdMatch[1]);
}

// Let's search for all JSON in the HTML
const jsonMatches = html.match(/\{"id":[\s\S]*?\}/g) || [];
console.log(`Found ${jsonMatches.length} small JSON blobs`);
jsonMatches.slice(0, 5).forEach(j => console.log(j));
