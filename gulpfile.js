'use strict';

(function() {

	const { src, series, parallel } = require('gulp');
	const eslint = require('gulp-eslint');

	var lintConfig = require('./build/config/eslint.config.js');

	function lintGlobalFiles(cb) {
		return src([
			'**/*.js',
			'!node_modules/**',
			'!src/collection/**'
		])
		.pipe(eslint(lintConfig.es5Options))
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());

		cb();
	}

	function lintSourceFiles(cb) {
		return src([
			'src/collection/**/*.js',
			'src/collection/**/*.jsx',
			'!src/collection/**/generated/**/*.js',
			'!src/collection/**/deploy/**/*.js'
		])
		.pipe(eslint(lintConfig.es6Options))
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());

		cb();
	}

	const lint = parallel(lintGlobalFiles, lintSourceFiles);

	exports.lint = lint;
	exports.default = series(lint);
	
})();
