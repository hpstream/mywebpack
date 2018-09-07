function HelloWorldPlugin(options) {
    // Setup the plugin instance with options...
  }
  
  HelloWorldPlugin.prototype.apply = function(compiler) {
    compiler.plugin('emit', function(compilation, callback) {
      // console.log(compilation); 
    });
  };
  
  module.exports = HelloWorldPlugin;