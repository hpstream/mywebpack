function MyPlugin(options) {
    // Configure your plugin with options...
    this.options = options;
  }
  
  MyPlugin.prototype.apply = function (compiler) {
    compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync('MyPlugin',(data, cb) => {
        console.log(1)
        // data.html = data.html.replace(/src="(\.\.\/)*/g,this.options.options);
        data.html = data.html.replace(/src="(\.\.\/)+/g,'src="'+this.options.options);
          cb(null, data)
        }
      )
    })
  }
  
  module.exports = MyPlugin