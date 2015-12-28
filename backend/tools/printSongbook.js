var fs = require('fs');
var wkhtmltopdf = require('wkhtmltopdf');

/* cli:

wkhtmltopdf --print-media-type toc --xsl-style-sheet ../common/models/toc.xsl 'http://localhost:3000/#/songbook' songbook.pdf

*/
wkhtmltopdf('http://localhost:3000/#/songbook', {
  toc: ['--xsl-style-sheet toc.xml'],
  pageSize: 'A4',
  encoding: 'utf-8',
  JavascriptDelay: 1000,
  outlineDepth: 2,
  printMediaType: true
})
  .pipe(fs.createWriteStream('songbook.pdf'));
