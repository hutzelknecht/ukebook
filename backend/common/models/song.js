var wkhtmltopdf = require('wkhtmltopdf');

module.exports = function(Song) {
  Song.pdf = function(res, callback){

    res.type('application/pdf');
    res.attachment('songbook.pdf');
    wkhtmltopdf('http://localhost:3000/#/songbook', {
      //pageSize: 'A4',
      //encoding: 'binary',
      JavascriptDelay: 1000,
      outlineDepth: 2,
      printMediaType: true,
      debug: false,
      cover: 'assets/titlepage.html',
      toc: ['--xsl-style-sheet assets/toc.xml']
    }).pipe(res, 'binary');

  };
  Song.remoteMethod('pdf',{
      accepts: [ { arg: 'res', type: 'object', 'http': {source: 'res'} } ],
      http: {path: '/pdf', verb: 'get'}
  });

};
