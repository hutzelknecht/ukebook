var wkhtmltopdf = require('wkhtmltopdf');
//wkhtmltopdf.command="C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe";
var fs = require('fs');
module.exports = function(Song) {

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
};
