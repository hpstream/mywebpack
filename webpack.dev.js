const merge = require('webpack-merge');


module.exports = function(env){
	const base = require('./webpack.base.js')(env);

	// const commonPath = common.output.path;
	// const dirpath = commonPath.substring(commonPath.lastIndexOf("wb-front-web3"));
	// const dirpaths = dirpath.replace(/\\/g, "/");
	// const publicPath = "./../" + dirpaths + "/"; //开发环境的路径

	return merge(base, {
		devtool: 'inline-source-map',
		devServer: {
			// contentBase: publicPath ,//监听代码变化自动提交并刷新网页
			contentBase: "./", 
			historyApiFallback:true,
			inline:true,
			hot:true
		}
	})
};