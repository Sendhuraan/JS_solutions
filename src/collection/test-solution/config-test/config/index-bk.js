(function() {

	const DB_NAME = 'resthub';

	var config = {
		node: {
			server: {
				port: 3000,
				serveDir: 'client'
			},
			data: {
				mongoUri: process.env.MONGODB_URI || 
					process.env.MONGO_HOST || 'mongodb://' +
					(process.env.IP || 'localhost') + ':' +
					(process.env.MONGO_PORT || '27017') + '/' +
					DB_NAME
			}
		},
		browser: true,
		tests: {
			node: {
				dir: 'server',
				pattern: ['**/*_test.js'],
			},
			browser: {
				dir: 'client',
				pattern: ['**/*_test.js', '**/*_test.jsx']
			}
		},
		bundle: {
			node: {
				entry: 'index.js',
				output: 'deploy/index.js'
			},
			browser: {
				entry: 'client/index.js' || 'client/index.jsx',
				output: 'deploy/client/bundle.js'
			}
		}

	}

	// No config - Executed by node (index.js as start)
	var config = {

		// The following default config is added.
		// node: true
	}

	// only browser config - browser code bundled, executed by node (index.js as start)
	var config = {

		// node default server config is added, server files should be copied to browser bundle dir.
		// If server dir & index.js is not present, then error should be thrown, because there must be a server to serve the client.

		// The following default config is added.
		// node: {
		// 	server: true
		// }

		// if browser is true, then default bundle config is added.
		browser: true

		// The following is equivalent to the above. Since browser is added, it's default purpose is to bundle, hence bundle is added as default.
		// browser: {
		// 	bundle: true
		// }

		// The following is the default bundle config.
		// browser: {
		// 	bundle: {
		// 		entry: 'index.js',
		// 		output: 'client/bundle.js'
		// 	}
		// }
	}

	// node server & browser directories
	var config = {

		node: {
			server: {
				// server dir override. default is server.
				dir: 'app'

				// port & serveDir are overrided
				port: 5000,
				serveDir: 'client'
			}
		},
		browser: {
			// server dir override. default is client.
			dir: 'browser'
		}
	}

	// node serve & browser config
	var config = {

		// port & serveDir are overrided
		node: {
			server: {
				port: 5000,
				serveDir: 'client'
			}
		},
		browser: {
			// bundle entry & output are overrided.
			bundle: {
				entry: '',
				output: ''
			}
		}
	}

	// node default bundle, server & browser config
	var config = {

		// bundle default config, port & serveDir are overrided
		node: {
			server: {
				port: 5000,
				serveDir: 'client'
			},
			bundle: true
		},
		browser: {
			bundle: {
				entry: 'app.js',
				output: 'client/main.js'
			}
		}
	}

	// node bundle, server & browser config
	var config = {

		// bundle config, port & serveDir are overrided
		node: {
			server: {
				port: 5000,
				serveDir: 'client'
			},
			// node bundle overrided.
			bundle: {
				entry: 'app.js',
				output: 'server.js'
			}
		},
		browser: {
			// browser bundle overrided.
			bundle: {
				entry: 'app.js',
				output: 'client/main.js'
			}
		}
	}

	// node & browser default test config
	var config = {

		node: {
			test: true
		},
		browser: {
			test: true
		}

		// node: {
		// 	test: {
		// 		pattern: ['**/*_test.js']
		// 	}
		// },
		// browser: {
		// 	test: {
		// 		pattern: ['**/*_test.js', '**/*_test.jsx']
		// 	}
		// }
	}

	// node server render
	var config = {

		node: {
			server: {
				render: true
			}
		}
	}

	// browser templates
	var config = {
		browser: {
			template: true
		}

		// default template dir
		// browser: {
		// 	template: {
		// 		dir: 'templates'
		// 	}
		// }
	}

	// Full possible custom override
	var config = {

		node: {
			server: {
				dir: 'app',
				port: 5666,
				serveDir: 'public',
				render: true
			},
			test: {
				pattern: ['**/*.test.js']
			},
			bundle: {
				entry: 'app.js',
				output: 'server.js'
			}
		}
		browser: {
			dir: 'browser',
			test: {
				pattern: ['**/*.test.js', '**/*.test.jsx']
			},
			bundle: {
				entry: 'app.js',
				output: 'main.js'
			}
			template: {
				dir: 'partials',
				filename: 'main.js',
				dataname: 'data.json'
			}
		}
	}

	module.exports = config;
	
})();

				
