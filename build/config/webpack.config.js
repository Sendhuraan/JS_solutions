'use strict';

(function() {

	var HtmlWebpackPlugin = require('html-webpack-plugin');

	module.exports = {
		entry: '',
		output: {
			path: '',
			filename: 'bundle.js'
		},
		module: {
			rules: [
				{
					test: /\.css$/,
					use: [
						'style-loader',
						'css-loader'
					]
				},
				{
					test: /\.(js|jsx)$/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-react', '@babel/preset-env']
						}
					},
					exclude: /node_modules/
				}
			]
		},
		plugins: [
			new HtmlWebpackPlugin()
		],
		resolve: {
			extensions: [
				'.js',
				'.jsx'
			]
		}
	};

}());
