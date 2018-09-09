const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = function(env){
	const common = require('./webpack.base.js')(env);
	const commonPath = common.output.path;
	const dirpath = commonPath.substring(commonPath.lastIndexOf("wb-front-web3"));
	const dirpaths = dirpath.replace(/wb-front-web3/, "web3");
	const dirpathss = dirpaths.replace(/\\/g, "/");
	const publicPath = "https://t1.kuaishebao.com/web/" + dirpathss + "/"; //测试环境js和css的路径

	//清除文件夹，防止每次webpack导致文件过大
	let fs = require('fs');//无需安装，直接使用
	let emptyDir = function (fileUrl) {
		try {
			let files = fs.readdirSync(fileUrl);//读取该文件夹
			files.forEach(function (file) {
				let stats = fs.statSync(fileUrl + '/' + file);
				if (stats.isDirectory()) {
					emptyDir(fileUrl + '/' + file);
				} else {
					fs.unlinkSync(fileUrl + '/' + file);
					console.log("删除文件" + fileUrl + '/' + file + "成功");
				}
			});
		} catch (e) {
			console.log(e);
		}
	};
	emptyDir(commonPath);

	return merge(common, {
		output: {
			publicPath: publicPath
		},
		plugins: [
			new UglifyJSPlugin({
				output: {
					quote_keys: true,
					keep_quoted_props: true,
					screw_ie8: false
				},
				mangleProperties: {
					screw_ie8: false
				},
				compress: {
					properties: false,
					screw_ie8: false
				},
				mangle: {
					screw_ie8: false,
					except: ['e']
				},
				sourceMap: false
			}),
			new OptimizeCssAssetsPlugin(),
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify('production')
				}
			})
		]
	})
};