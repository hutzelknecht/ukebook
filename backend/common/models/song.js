var wkhtmltopdf = require('wkhtmltopdf');

module.exports = function(Song) {
  Song.pdf = function(res, callback){

    res.type('application/pdf');
    res.attachment('songbook.pdf');
    wkhtmltopdf('/#/songbook', {
      //pageSize: 'A4',
      //encoding: 'binary',
      JavascriptDelay: 1000,
      outlineDepth: 2,
      printMediaType: true,
      debug: false,
      toc: {}
    }).pipe(res, 'binary');

  };
  Song.remoteMethod('pdf',{
      accepts: [ { arg: 'res', type: 'object', 'http': {source: 'res'} } ],
      http: {path: '/pdf', verb: 'get'}
  });

};
