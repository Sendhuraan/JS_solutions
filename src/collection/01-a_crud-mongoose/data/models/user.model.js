(function() {

	const mongoose = require('mongoose');
	const { Schema } = mongoose;

	const UserSchema = new Schema({
		firstName: String,
		lastName: String,
		likes: [String]
	});

	// Export Contact model
	var User = module.exports = mongoose.model('User', UserSchema);
	
})();
