import React from 'react';
import ReactDOM from 'react-dom';

import AppointmentsDayView from '../AppointmentsDayView';

(function() {

	describe('AppointmentsDayView', function() {

		let container;

		beforeEach(function() {
			container = document.createElement('div');
		});

		function renderComponent(component) {
			return ReactDOM.render(component, container);
		}

		it('renders a div with right ID', function() {
			renderComponent(<AppointmentsDayView appoinments={[]} />);
			expect(container.querySelector('div#appointments-day-view')).not.toBeNull();
		});
		
	});
	
})();
