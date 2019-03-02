'use strict';

(function() {

	var webpack = require('webpack');
	var HtmlWebpackPlugin = require('html-webpack-plugin');
	var nodeExternals = require('webpack-node-externals');

	var transpileConfig = require('./babel.config.js');

	var node = {
		entry: '',
		mode: 'development',
		target: 'node',
		node: {
			__dirname: false
		},
		output: {
			path: '',
			filename: 'index.js'
		},
		externals: [nodeExternals()],
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
						options: transpileConfig.node
					}
				}
			]
		},
		plugins: [],
		resolve: {
			extensions: [
				'.js',
				'.jsx'
			]
		}
	};

	var browser = {
		entry: '',
		mode: 'development',
		target: 'web',
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
						options: transpileConfig.browser
					},
					exclude: /node_modules/
				}
			]
		},
		plugins: [],
		resolve: {
			extensions: [
				'.js',
				'.jsx'
			]
		}
	};

	var publicAPI = {
		node,
		browser
	};

	module.exports = publicAPI;

}());
