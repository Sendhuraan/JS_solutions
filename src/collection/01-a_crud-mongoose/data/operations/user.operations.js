(function() {

	var User = require('../models/user.model.js');

	const addUser = function(firstName, lastName) {

		var newUser = new User({
			firstName,
			lastName
		});

		newUser.save()
			.then(() => {
				console.log('User Inserted Successfully!');
			});

		return newUser;
	};

	const getUser = function(id) {

		var retrievedUser = User.findById(id, function(err) {

			if(err) {
				console.log(err);
			}
			else {
				console.log('User Retrieved Successfully!');
			}
		});

		return retrievedUser;
	};

	const removeUser = function(id) {
		
		var deletedUser = User.deleteOne({ id }, function(err) {

			if(err) {
				console.log(err);
			}
			else {
				console.log('User Deleted Successfully!');
			}
		});

		return deletedUser;
	};

	var publicAPI = {
		addUser,
		getUser,
		removeUser
	};

	module.exports = publicAPI;
	
})();
