const fs = require('fs');
const content = fs.readFileSync('stitch_screens/explore_careers.html', 'utf8');

const mainIdx = content.indexOf('<main');
const mainEnd = content.indexOf('</main>');
const mainHtml = content.substring(mainIdx, mainEnd + 7);

fs.writeFileSync('stitch_screens/extracted_explore_main.html', mainHtml, 'utf8');
console.log('Saved extracted_explore_main.html length:', mainHtml.length);
