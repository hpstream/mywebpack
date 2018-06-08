//可以以app/testQiniu目录为例去看
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const util = require('./util');
const publicPath = './dist';
const sourcePath = path.join(__dirname,'./src/');
// const basePublic = '../wb-front-web3/';
module.exports = function (env) {
	// let dirpath = "";
	// if(env.project){
	// 	dirpath = env.project;
	// }
	// const publicPath = basePublic + dirpath + ''; //打包之后的路径

	// webpackConfig
	const webpackConfig = {
		entry:{
			index:'./src/js/index.js'
		},
		output: {
			filename: 'js/[name].[hash:8].js',
			chunkFilename: 'js/[name].[hash:8].js',
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
			new webpack.HotModuleReplacementPlugin(), //热加载插件
			new ExtractTextPlugin('css/[name].[contenthash:8].css'),
			new webpack.HashedModuleIdsPlugin(),
			new webpack.optimize.CommonsChunkPlugin({ //提取公共模块，比如index1.js和index2.js都引入了jquery，那么jquery就会被当作公共文件被打包进runtime
				name: ['runtime'],
				minChunks: Infinity
			}),
			new webpack.ProvidePlugin({
				Vue: ['vue/dist/vue.min.js']
			}),
			new HtmlWebpackPlugin({
				template:  './src/index.html'  , //原html文件
				filename: 'index.html', //index.html 生成后的 文件名称
				chunks: ["index", 'runtime'] //需要的chunks
		})

		]
	};
	// webpackConfig.entry = util.readFilesName(path.join(sourcePath,'./js'),'js'); //添加entry
	// let html = util.readFilesName(sourcePath,'html');
	// for(let key in html){
	// 	let plugin = new HtmlWebpackPlugin({
	// 		template:  './' + html[key] + '', //原html文件
	// 		filename: '' + html[key] + '', //index.html 生成后的 文件名称
	// 		chunks: ["" + key + "", 'runtime'] //需要的chunks
	// 	})
	// 	webpackConfig.plugins.push(plugin);
	// }
	return webpackConfig;
};
