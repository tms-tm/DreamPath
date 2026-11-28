const fs = require('fs');
const content = fs.readFileSync('stitch_screens/explore_careers.html', 'utf8');

const mainIdx = content.indexOf('<main');
console.log('=== Explore Careers Sections ===');
const sections = content.match(/<section[\s\S]*?<\/section>/g) || [];
console.log('Total sections:', sections.length);
sections.forEach((s, idx) => {
  const headingMatch = s.match(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/);
  const purpose = s.match(/data-purpose="([^"]*)"/);
  console.log(`Section ${idx + 1}: [${purpose ? purpose[1] : 'no-purpose'}] -> "${headingMatch ? headingMatch[1].trim() : 'no-heading'}"`);
});
