const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/screens/**/*.tsx');
let modifiedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Regex to match `header: { ... }`
  const headerRegex = /(header:\s*\{[^}]*?\})/g;
  
  const newContent = content.replace(headerRegex, (match) => {
    let newHeader = match;
    
    // Check if paddingVertical exists
    if (/paddingVertical:\s*\d+,/.test(newHeader)) {
      newHeader = newHeader.replace(/paddingVertical:\s*\d+,/, 'paddingVertical: 40,');
    } else {
      // If no paddingVertical, try paddingTop
      if (/paddingTop:\s*\d+,/.test(newHeader)) {
        newHeader = newHeader.replace(/paddingTop:\s*\d+,/, 'paddingVertical: 40,');
      } else {
        // Just add it before the closing brace
        newHeader = newHeader.replace(/\s*\}$/, ',\n    paddingVertical: 40,\n  }');
      }
    }
    
    // Also remove any stray paddingBottom if we just converted paddingTop to paddingVertical
    if (newHeader !== match && /paddingBottom:\s*\d+,/.test(newHeader) && newHeader.includes('paddingVertical: 40,')) {
      newHeader = newHeader.replace(/\s*paddingBottom:\s*\d+,/, '');
    }
    
    return newHeader;
  });
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Updated ${file}`);
    modifiedCount++;
  }
});

console.log(`Total files modified: ${modifiedCount}`);
