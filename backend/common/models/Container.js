module.exports = function(Container) {
  
  Container.on('attached',function(app){
    Container.upload = function(filter, empty, cb){
      cb(null,['This is a overridden method'])
    }
  })

};
