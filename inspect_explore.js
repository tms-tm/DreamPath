const fs = require('fs');
const content = fs.readFileSync('stitch_screens/explore_careers.html', 'utf8');

const mainIdx = content.indexOf('<main');
console.log('=== Explore Careers Main Snippet ===');
if (mainIdx !== -1) {
  console.log(content.substring(mainIdx, mainIdx + 3000));
} else {
  console.log('No main tag found. First 1500 chars:');
  console.log(content.substring(0, 1500));
}
