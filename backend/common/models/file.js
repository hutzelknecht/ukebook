var CONTAINERS_URL = '/api/containers/';
module.exports = function(File) {

  File.upload = function (ctx, options, cb) {
    if (!options) options = {};
    ctx.req.params.container = 'storage';
    File.app.models.Container.upload(ctx.req, ctx.result, options, function (err,fileObj) {

      if(err) {

        cb(err);

      } else {

        var fileInfo = fileObj.files.file[0];
        var url = CONTAINERS_URL + fileInfo.container + '/download/' + fileInfo.name;

        File.create({
          name: fileInfo.name,
          type: fileInfo.type,
          songId: ctx.req.params.songId,
          container: fileInfo.container,
          url: url
        }, function (err, obj) {
          if (err !== null) {
            cb(err);
          } else {
            cb(null, obj);
          }
        });
      }
    });
  };

  File.remoteMethod('upload', {
      // description: 'Uploads a file',
      accepts: [
        { arg: 'ctx', type: 'object', http: { source:'context' } },
        { arg: 'options', type: 'object', http:{ source: 'query'} }
      ],
      returns: {
        arg: 'fileObject', type: 'object', root: true
      },
      http: {path: '/upload', verb: 'post'}
    }
  );

};
