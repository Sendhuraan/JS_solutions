(function() {

	const express = require('express');

	// Initialize express router
	const router = new express.Router();



	// Set default API response
	router.get('/', function (req, res) {
		res.json({
			status: 'API Its Working',
			message: 'Welcome to RESTHub crafted with love!',
		});
	});

	// Import contact controller
	var contactController = require('../controllers/contact.controller');

	// Contact routes
	router.route('/contacts')
		.get(contactController.index)
		.post(contactController.new);

	router.route('/contacts/:contact_id')
		.get(contactController.view)
		.patch(contactController.update)
		.put(contactController.update)
		.delete(contactController.delete);

	// Export API routes
	module.exports = router;
	
})();
