var wkhtmltopdf = require('wkhtmltopdf');

module.exports = function(Song) {
  Song.pdf = function(res, layout, callback){
    var url = 'http://127.0.0.1:3000/#/songbook';
    if (layout) { url+= layout; }
    res.type('application/pdf');
    res.attachment('songbook.pdf');
    wkhtmltopdf(url, {
      JavascriptDelay: 1200,
      outlineDepth: 2,
      printMediaType: true,
      debug: false,
      cover: '/root/uke/backend/assets/titlepage.html',
      toc: ['--xsl-style-sheet /root/uke/backend/assets/toc.xml']
    }).pipe(res, 'binary');

  };
  Song.remoteMethod('pdf',{
    accepts: [
      { arg: 'res', type: 'object', 'http': {source: 'res'} },
      { arg: 'layout', type: 'string', 'http': {source: 'query'} }
    ],
    http: {path: '/pdf', verb: 'get'}
  });

};
