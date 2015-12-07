var wkhtmltopdf = require('wkhtmltopdf');
<<<<<<< HEAD

=======
//wkhtmltopdf.command="C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe";
var fs = require('fs');
>>>>>>> origin/master
module.exports = function(Song) {
  Song.pdf = function(res, callback){

    res.type('application/pdf');
    res.attachment('songbook.pdf');
    wkhtmltopdf('http://localhost:3000/#/songbook', {
      pageSize: 'A4',
      encoding: 'binary',
      JavascriptDelay: 1000,
      outlineDepth: 2,
      printMediaType: true,
      toc: {}
    }).pipe(res, 'binary');

<<<<<<< HEAD
  };
  Song.remoteMethod('pdf',
    {
      accepts: [ { arg: 'res', type: 'object', 'http': {source: 'res'} } ],
      http: {path: '/pdf', verb: 'get'}
    });
=======
	Song.pdf = function(res) {
      wkhtmltopdf('http://google.com/', { pageSize: 'A4', javascriptDelay: 1000 })
  		  .pipe(res, 'binary');

      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=test.pdf'
      });
    }

    Song.remoteMethod(
        'pdf',
        {
          accepts: { arg: 'res', type: 'object', http: {source: 'res'} },
          returns: { arg: 'res', type: 'buffer'},
          http: {path: '/pdf', verb: 'get'}
        }
    );
>>>>>>> origin/master
};
