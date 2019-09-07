/* eslint no-undef: 'off' */

'use strict';

(function() {

    try {
        undeclaredVar;
    }
    catch(err) {
        if(err.name === 'ReferenceError') {
            console.log('variable is not declared');
        }
    }

    var undefinedVar;

    if(typeof undefinedVar === 'undefined') {
        console.log('variable is declared, but value is undefined');
    }
	
})();
