//可以以app/testQiniu目录为例去看
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = function (env) {
	let dirpath = "";
	if(env.project){
		dirpath = env.project;
	}
	const publicPath = '../wb-front-web3/' + dirpath + ''; //打包之后的路径

	const webpackConfig = {
		output: {
			filename: 'js/[name].[chunkhash:8].js',
			chunkFilename: 'js/[name].[chunkhash:8].js',
			path: path.resolve(__dirname, publicPath),
			publicPath: "/"
		},
		module: {
			rules: [{
				test: /\.(html|php)$/,
				loader: 'html-withimg-loader' //处理图片
			}, {
				test: /\.(js)$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			},
			{
				test: /\.(css|less)$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [{
						loader: "css-loader"
					}, {
						loader: "less-loader"
					}]
				})
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [{
					loader: 'url-loader?limit=1&name=img/[name].[hash:8].[ext]'
				}]
			}
			]
		},
		plugins: [
			new webpack.ProvidePlugin({
				$: 'jquery',
				Vue: ['vue/dist/vue.min.js'],
				FastClick: 'fastclick',
				marked: 'marked'
			}),
			new ExtractTextPlugin('css/[name].[contenthash:8].css'),
			new webpack.HashedModuleIdsPlugin(),
			new webpack.optimize.CommonsChunkPlugin({ //提取公共模块，比如index1.js和index2.js都引入了jquery，那么jquery就会被当作公共文件被打包进runtime
				name: ['runtime'],
				minChunks: Infinity
			}),
			new webpack.ProvidePlugin({
				Vue: ['vue/dist/vue.min.js']
			})

		]
	};

	//动态获取entry和动态加载HtmlWebpackPlugin
	//js文件夹下的文件都会加进去并且被相应的html引用，所以不需要加进去的js文件一定不要放在js文件夹下面，可以新建一个文件夹去放，比如common/meta.js
	const entry = {};
	let fs = require('fs');//无需安装，直接使用
	let emptyDir = function (fileUrl) {
		try {
			let files = fs.readdirSync(fileUrl);//读取该文件夹
			files.forEach(function (file) {
				if (file == "js") {
					let jsFile = fs.readdirSync(dirpath + "/" + file);
					jsFile.forEach(function (jsFile) {
						let jsFileName = jsFile.split(".")[0];
						entry[jsFileName] = './' + dirpath + '/js/' + jsFile;
					})
				}
				if (file.match(/\.(html|php)$/)) {
					var htmlFilename = file.split(".")[0];
					const plugin = new HtmlWebpackPlugin({
						template: '' + dirpath + '/' + file + '', //原html文件
						filename: '' + file + '', //index.html 生成后的 文件名称
						chunks: ["" + htmlFilename + "", 'runtime'] //需要的chunks
					})
					webpackConfig.plugins.push(plugin);
				}
			});
		} catch (e) {
			console.log(e);
		}
	};
	emptyDir(dirpath);
	webpackConfig.entry = entry; //添加entry
	return webpackConfig;
};