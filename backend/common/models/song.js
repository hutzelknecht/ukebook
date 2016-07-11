var wkhtmltopdf = require('wkhtmltopdf');
var PDFMerge = require('pdf-merge');
var fs = require('fs');

module.exports = function(Song) {
  Song.merge = function(res, callback){

    var base_path = '/home/micha/dev/ukebook/backend/tmp/';
    var files = [file('example1.pdf'), file('example2.pdf')];
    var pdfMerge = new PDFMerge(files);

    res.type('application/pdf');
    res.attachment('songbook.pdf');

    pdfMerge.asReadStream().merge(function(error, readStream){
      readStream.pipe(res, 'binary');
    });
    // local file example
    // pdfMerge.asNewFile('/home/micha/dev/ukebook/backend/tmp/merged.pdf').merge();

    function file(filename){
      return base_path + filename;
    }

  };
  Song.pdf = function(res, layout, callback){

    var url = 'http://127.0.0.1:3000/#/songbook';
    var delay = layout ? 10000 : 2000;

    if (layout) { url+= layout; }

    res.type('application/pdf');
    res.attachment('songbook.pdf');

    wkhtmltopdf(url, {
      JavascriptDelay: delay,
      outlineDepth: 2,
      printMediaType: true,
      debug: false,
      cover: '/root/uke/backend/assets/titlepage.html',
      toc: ['--xsl-style-sheet /root/uke/backend/assets/toc.xml']
    }).pipe(res, 'binary');

  };
  Song.remoteMethod('merge', {
    accepts: [
      { arg: 'res', type: 'object', 'http': {source: 'res'} },
      { arg: 'layout', type: 'string', 'http': {source: 'query'} }
    ],
    http: {path: '/merge', verb: 'get'}
  });
  Song.remoteMethod('pdf', {
    accepts: [
      { arg: 'res', type: 'object', 'http': {source: 'res'} },
      { arg: 'layout', type: 'string', 'http': {source: 'query'} }
    ],
    http: {path: '/pdf', verb: 'get'}
  });

};
