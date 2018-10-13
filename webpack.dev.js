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
			hot:true,
			proxy: {
				'/api': {
					target: 'https://www.easy-mock.com', //这里并没有生效，依然是在8018端口发送的请求
					pathRewrite: {'^/api': 'mock/5a56cf0b55fb93147c5911e7/example/api'},
					secure: false,
					changeOrigin: true
				}
			}
		}
	})
};