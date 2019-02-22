'use strict';

(function() {

	var webpack = require('webpack');
	var HtmlWebpackPlugin = require('html-webpack-plugin');
	var nodeExternals = require('webpack-node-externals');

	var client = {
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
						options: {
							presets: ['@babel/preset-react', '@babel/preset-env']
						}
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

	var server = {
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
						options: {
							presets: [
								['@babel/preset-react'],
								['@babel/preset-env', {
										'targets': {
											node: 'current'
										}
									}
								]
							]
						}
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

	var publicAPI = {
		server: server,
		client: client
	};

	module.exports = publicAPI;

}());
