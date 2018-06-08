const merge = require('webpack-merge');

module.exports = function(env){
	const test = require('./webpack.test.js')(env);
	const publicPath = test.output.publicPath.replace(/t1.kuaishebao.com/, "qiniuh5.wodidashi.com"); //线上环境js和css的路径
	return merge(test, {
		output: {
			publicPath: publicPath
		}
	})
};