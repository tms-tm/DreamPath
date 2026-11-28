const fs = require('fs');

const lb = fs.readFileSync('stitch_screens/leaderboard.html', 'utf8');
const prof = fs.readFileSync('stitch_screens/profile.html', 'utf8');

const lbMain = lb.indexOf('<main');
const lbEnd = lb.indexOf('</main>');
if (lbMain !== -1 && lbEnd !== -1) {
  fs.writeFileSync('stitch_screens/extracted_lb.html', lb.substring(lbMain, lbEnd + 7), 'utf8');
  console.log('Saved extracted_lb.html length:', lbEnd - lbMain);
}

const profMain = prof.indexOf('<main');
const profEnd = prof.indexOf('</main>');
if (profMain !== -1 && profEnd !== -1) {
  fs.writeFileSync('stitch_screens/extracted_prof.html', prof.substring(profMain, profEnd + 7), 'utf8');
  console.log('Saved extracted_prof.html length:', profEnd - profMain);
}
