import fs from 'node:fs';
import path from 'node:path';

// 1. Parse arguments
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Error: Please provide the number of days to shift as the first argument.');
  console.error('Usage: node update-review-dates.js <days> [product-handle]');
  process.exit(1);
}

const daysToShift = parseInt(args[0], 10);
if (isNaN(daysToShift)) {
  console.error('Error: The first argument must be a valid number.');
  process.exit(1);
}

const targetProductHandle = args[1] || null;

const UK_FULL_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const UK_SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const MONTH_NAME_TO_INDEX = {
  jan: 0, january: 0,
  feb: 1, february: 1,
  mar: 2, march: 2,
  apr: 3, april: 3,
  may: 4,
  jun: 5, june: 5,
  jul: 6, july: 6,
  aug: 7, august: 7,
  sep: 8, sept: 8, september: 8,
  oct: 9, october: 9,
  nov: 10, november: 10,
  dec: 11, december: 11
};

function shiftDateObj(dateObj, days) {
  const d = new Date(dateObj.getTime());
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

function parseAndShiftIso(isoStr, days) {
  const match = String(isoStr).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;
  const d = new Date(`${match[1]}-${match[2]}-${match[3]}T00:00:00.000Z`);
  if (isNaN(d.getTime())) return null;
  const shifted = shiftDateObj(d, days);
  const yyyy = shifted.getUTCFullYear();
  const mm = String(shifted.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(shifted.getUTCDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function shiftFormattedDateString(str, days) {
  if (!str) return str;
  
  // Format 1: "19 August 2026" or "8 June 2026" or "19 Aug 2026" or "09 Aug 2026" or "30 Sept 2025"
  const fullMatch = str.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (fullMatch) {
    const day = parseInt(fullMatch[1], 10);
    const monthKey = fullMatch[2].toLowerCase();
    const year = parseInt(fullMatch[3], 10);
    
    if (monthKey in MONTH_NAME_TO_INDEX) {
      const mIdx = MONTH_NAME_TO_INDEX[monthKey];
      const d = new Date(Date.UTC(year, mIdx, day));
      const shifted = shiftDateObj(d, days);
      const isShortMonth = fullMatch[2].length <= 4;
      const paddedDay = fullMatch[1].length === 2 ? String(shifted.getUTCDate()).padStart(2, '0') : String(shifted.getUTCDate());
      const monthLabel = isShortMonth ? UK_SHORT_MONTHS[shifted.getUTCMonth()] : UK_FULL_MONTHS[shifted.getUTCMonth()];
      return `${paddedDay} ${monthLabel} ${shifted.getUTCFullYear()}`;
    }
  }

  // Format 2: "Jul 9, 2024" or "Feb 20, 2025" or "September 12, 2025"
  const usMatch = str.match(/^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})$/);
  if (usMatch) {
    const monthKey = usMatch[1].toLowerCase();
    const day = parseInt(usMatch[2], 10);
    const year = parseInt(usMatch[3], 10);
    
    if (monthKey in MONTH_NAME_TO_INDEX) {
      const mIdx = MONTH_NAME_TO_INDEX[monthKey];
      const d = new Date(Date.UTC(year, mIdx, day));
      const shifted = shiftDateObj(d, days);
      const isShortMonth = usMatch[1].length <= 4;
      const monthLabel = isShortMonth ? UK_SHORT_MONTHS[shifted.getUTCMonth()] : UK_FULL_MONTHS[shifted.getUTCMonth()];
      return `${monthLabel} ${shifted.getUTCDate()}, ${shifted.getUTCFullYear()}`;
    }
  }

  return str;
}

function shiftIstDateString(str, days) {
  // Format: "2026-08-27 09:38:01 IST"
  const match = String(str).match(/^(\d{4}-\d{2}-\d{2})(\s+[^"]+)/);
  if (!match) return str;
  const shiftedIso = parseAndShiftIso(match[1], days);
  if (!shiftedIso) return str;
  return `${shiftedIso}${match[2]}`;
}

function processJsReviewsFile(filePath, days) {
  let content = fs.readFileSync(filePath, 'utf8');
  let dateCount = 0;
  let displayDateCount = 0;
  let replyDateCount = 0;
  let baseTimestampCount = 0;
  let istDateCount = 0;

  // 1. Shift ISO dates: date: '2026-08-19' or "date": "2026-08-19"
  content = content.replace(/(["']?date["']?:\s*['"])(\d{4}-\d{2}-\d{2})(['"])/g, (match, p1, dateStr, p3) => {
    const shifted = parseAndShiftIso(dateStr, days);
    if (shifted) {
      dateCount++;
      return `${p1}${shifted}${p3}`;
    }
    return match;
  });

  // 2. Shift dateIST: "dateIST": "2026-08-27 09:38:01 IST"
  content = content.replace(/(["']?dateIST["']?:\s*['"])([^'"]+)(['"])/g, (match, p1, dateStr, p3) => {
    const shifted = shiftIstDateString(dateStr, days);
    if (shifted !== dateStr) {
      istDateCount++;
      return `${p1}${shifted}${p3}`;
    }
    return match;
  });

  // 3. Shift displayDate: displayDate: '19 August 2026' or '19 Aug 2026' or 'Jul 9, 2024'
  content = content.replace(/(["']?displayDate["']?:\s*['"])([^'"]+)(['"])/g, (match, p1, dateStr, p3) => {
    const shifted = shiftFormattedDateString(dateStr, days);
    if (shifted !== dateStr) {
      displayDateCount++;
      return `${p1}${shifted}${p3}`;
    }
    return match;
  });

  // 4. Shift merchant reply dates: date: '20 June 2026' or '18 Jun 2026'
  content = content.replace(/(["']?date["']?:\s*['"])(\d{1,2}\s+[A-Za-z]+\s+\d{4})(['"])/g, (match, p1, dateStr, p3) => {
    const shifted = shiftFormattedDateString(dateStr, days);
    if (shifted !== dateStr) {
      replyDateCount++;
      return `${p1}${shifted}${p3}`;
    }
    return match;
  });

  // 5. Shift baseTimestamp: new Date('2026-08-21T12:00:00Z').getTime()
  content = content.replace(/(new Date\(['"])(\d{4}-\d{2}-\d{2})(T[^'"]+['"]\)\.getTime\(\))/g, (match, p1, dateStr, p3) => {
    const shifted = parseAndShiftIso(dateStr, days);
    if (shifted) {
      baseTimestampCount++;
      return `${p1}${shifted}${p3}`;
    }
    return match;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath}:`);
  console.log(`  - ${dateCount} ISO dates shifted by ${days} days`);
  if (displayDateCount > 0) console.log(`  - ${displayDateCount} display dates shifted`);
  if (replyDateCount > 0) console.log(`  - ${replyDateCount} merchant reply dates shifted`);
  if (baseTimestampCount > 0) console.log(`  - ${baseTimestampCount} base timestamp shifted`);
  if (istDateCount > 0) console.log(`  - ${istDateCount} IST timestamp shifted`);
}

function processTsReviewsFile(filePath, days, filterHandle) {
  let content = fs.readFileSync(filePath, 'utf8');
  let isoCount = 0;
  let formattedCount = 0;

  const updateDatesInBlock = (block) => {
    return block.replace(/("date":\s*")([^"]+)(")/g, (match, p1, dateVal, p3) => {
      // Check if ISO format YYYY-MM-DD
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateVal)) {
        const shifted = parseAndShiftIso(dateVal, days);
        if (shifted) {
          isoCount++;
          return `${p1}${shifted}${p3}`;
        }
      }
      // Check if formatted date e.g. "14 Aug 2026", "30 Sept 2025", "19 August 2026"
      const shiftedFormatted = shiftFormattedDateString(dateVal, days);
      if (shiftedFormatted !== dateVal) {
        formattedCount++;
        return `${p1}${shiftedFormatted}${p3}`;
      }
      return match;
    });
  };

  if (filterHandle) {
    const targetVar = filterHandle === 'miroooo-x' ? 'mirooooXReviews' : (filterHandle === 'miroooo-x2' ? 'mirooooX2Reviews' : null);
    if (targetVar) {
      const regex = new RegExp(`(export const ${targetVar} = \\[)([\\s\\S]*?)(\\n\\];)`, 'g');
      content = content.replace(regex, (fullMatch, prefix, reviewsBlock, suffix) => {
        const updatedBlock = updateDatesInBlock(reviewsBlock);
        return `${prefix}${updatedBlock}${suffix}`;
      });
    }
  } else {
    content = updateDatesInBlock(content);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath}:`);
  console.log(`  - ${isoCount + formattedCount} review dates shifted by ${days} days in TypeScript dataset (${isoCount} ISO + ${formattedCount} formatted)`);
}

function processJsonReviewsFile(filePath, days) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const reviews = JSON.parse(fileContent);
  let updatedCount = 0;

  reviews.forEach(review => {
    if (review.date) {
      const dateStr = review.date.split(' ')[0];
      const shifted = parseAndShiftIso(dateStr, days);
      if (shifted) {
        review.date = `${shifted} 00:00:00 +0000 UTC`;
        review.displayDate = shifted;
        updatedCount++;
      }
    }
  });

  if (updatedCount > 0) {
    fs.writeFileSync(filePath, JSON.stringify(reviews, null, 2) + '\n', 'utf8');
    console.log(`Updated ${updatedCount} reviews in ${filePath}`);
  }
}

// Main execution
const rootDir = process.cwd();

// 1. Process TypeScript shared reviews dataset
const sharedReviewsPath = path.join(rootDir, 'packages', 'shared', 'src', 'reviews.ts');
if (fs.existsSync(sharedReviewsPath)) {
  processTsReviewsFile(sharedReviewsPath, daysToShift, targetProductHandle);
}

// 2. Process JS review assets across apps (UK & US)
const jsFileNames = [
  { handle: 'miroooo-x', file: 'miroooo-reviews.js' },
  { handle: 'miroooo-x2', file: 'miroooo-x2-reviews.js' },
  { handle: 'miroooo-x', file: 'org_miroooo-reviews.js' },
  { handle: 'miroooo-x2', file: 'org_miroooo-x2-reviews.js' },
];

const appDirs = ['apps/uk', 'apps/us'];
appDirs.forEach(appRelPath => {
  const assetsRefDir = path.join(rootDir, appRelPath, 'public', 'assets_ref');
  if (fs.existsSync(assetsRefDir)) {
    jsFileNames.forEach(entry => {
      if (targetProductHandle && targetProductHandle !== entry.handle && !entry.file.includes(targetProductHandle)) {
        return;
      }
      const fullPath = path.join(assetsRefDir, entry.file);
      if (fs.existsSync(fullPath)) {
        processJsReviewsFile(fullPath, daysToShift);
      }
    });
  }
});

// 3. Process JSON reviews in apps/* if any exist
const appsDir = path.join(rootDir, 'apps');
if (fs.existsSync(appsDir)) {
  const apps = fs.readdirSync(appsDir);
  apps.forEach(app => {
    const reviewsDir = path.join(appsDir, app, 'src', 'data', 'reviews');
    if (fs.existsSync(reviewsDir)) {
      const files = fs.readdirSync(reviewsDir);
      files.forEach(file => {
        if (!file.endsWith('.json')) return;
        if (targetProductHandle && !file.includes(targetProductHandle)) return;
        processJsonReviewsFile(path.join(reviewsDir, file), daysToShift);
      });
    }
  });
}

console.log(`\nReview date update completed successfully (+${daysToShift} days).`);
