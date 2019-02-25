(function() {

	const path = require('path');
	const mongoose = require('mongoose');
	const { connection } = mongoose;

	var config = require('./config');
	var { addUser, getUser, removeUser } = require('./data/operations/user.operations.js');

	mongoose.Promise = global.Promise;
	mongoose.connect(
		config.mongoUri, { useNewUrlParser: true }
	)
	.catch(console.error);


	connection.once('connected', async () => {
		try {
			// Create
			const newUser = await addUser('John', 'Smith');

			// Read
			const user = await getUser(newUser.id);

			// Update
			user.firstName = 'Sendhuraan';
			user.lastName = 'NKK';
			user.likes = [
				'cooking',
				'watching movies',
				'ice cream'
			];
			await user.save();
			console.log(JSON.stringify(user, null, 4));

			// Delete
			await removeUser(user.id);
		}
		catch (error) {
			console.dir(error.message, { colors: true });
		}
		finally {
			await connection.close();
		}
	});

}());
