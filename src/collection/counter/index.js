const EventEmitter = require('events').EventEmitter;

const Counter = function(i) {
	this.increment = function() {
		i++;
		this.emit('incremented', i);
	};
};

Counter.prototype = new EventEmitter();

const counter = new Counter(10);

const callback = function(n) {
	console.log(n);
};

counter.addListener('incremented', callback);

counter.increment();
counter.increment();
