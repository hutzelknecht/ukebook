var fs = require('fs');
var wkhtmltopdf = require('wkhtmltopdf');

// URL
wkhtmltopdf('http://localhost:3000/#/songbook', {
  pageSize: 'A4',
  encoding: 'utf-8',
  JavascriptDelay: 1000,
  outlineDepth: 2,
  printMediaType: true,
  toc: {}
})
  .pipe(fs.createWriteStream('songbook.pdf'));
