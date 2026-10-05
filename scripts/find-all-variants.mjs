import fs from 'fs';

const html = fs.readFileSync('checkout_debug.html', 'utf8');

function findAllOrderLines(html) {
  const regex = /\bvariants:\s*(?=\[)/g;
  let match;
  let allLines = [];
  while ((match = regex.exec(html)) !== null) {
    const offset = match.index + match[0].length;
    let depth = 0;
    let quoted = false;
    let escaped = false;
    for (let index = offset; index < html.length; index++) {
      const character = html[index];
      if (quoted) {
        if (escaped) escaped = false;
        else if (character === '\\') escaped = true;
        else if (character === '"') quoted = false;
      } else if (character === '"') quoted = true;
      else if (character === '[') depth++;
      else if (character === ']' && --depth === 0) {
        try {
          const parsed = JSON.parse(html.slice(offset, index + 1));
          console.log(`\nFound variants array at index ${offset}:`);
          console.log(parsed.map(p => ({
            title: p.title,
            qty: p.quantity,
            price: p.price,
            variantId: p.variant?.id
          })));
          allLines.push(parsed);
        } catch (e) {
          console.error("Parse error:", e);
        }
        break;
      }
    }
  }
  return allLines;
}

findAllOrderLines(html);
