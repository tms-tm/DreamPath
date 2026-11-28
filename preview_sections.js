const fs = require('fs');
const html = fs.readFileSync('stitch_screens/extracted_explore_main.html', 'utf8');

// Print sections overview
const sections = html.split('<section');
sections.slice(1).forEach((sec, idx) => {
  const purpose = sec.match(/data-purpose="([^"]*)"/);
  console.log(`\n--- SECTION ${idx + 1}: ${purpose ? purpose[1] : 'unknown'} ---`);
  console.log(sec.substring(0, 600));
});
