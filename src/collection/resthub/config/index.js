(function() {

	const DB_NAME = 'resthub';

	module.exports = {
		env: process.env.NODE_ENV || 'development',
		port: process.env.PORT || 3000,
		mongoUri: process.env.MONGODB_URI || 
					process.env.MONGO_HOST || 'mongodb://' +
					(process.env.IP || 'localhost') + ':' +
					(process.env.MONGO_PORT || '27017') + '/' +
					DB_NAME,
		serveDir: 'client'
	};
	
})();
