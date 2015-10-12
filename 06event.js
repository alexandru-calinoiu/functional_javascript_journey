var numbers = [3, 1, 7];
var constant = 2;

function print(n) {
	console.log(n);
};

function mul(a, b) { 
	return a * b;
}

var _ = require('lodash');
var events = require('events');
var lazy = require('lazy.js');

var mulByConstant = _.partial(mul, constant);

function source (list) {
	var eventEmitter = new events.EventEmitter();
	lazy(list)
		.async(1000)
		.each(_.bind(eventEmitter.emit, eventEmitter, 'next'))

	return {
		on: function (cb) {
			eventEmitter.on('next', cb)
		}
	}
}

var stepEmitter = {
	map: function (cb) {
		var emitter = new events.EventEmitter();
		this.on('next', function (value) {
			var mappedValue = cb(value);
			emmitter.emit('next', mappedValue);
		});
		return _.extend(emitter, stepEmitter);
	},

	forEach: function (cb) {
		var emitter = new events.EventEmitter();
		this.on('next', function (value) {
			cb(value);
			emitter.emit('next', value)
		});
		return _.extend(emitter, stepEmitter);
	},

	buffer: function (n) {
		var  received = [];
		var emitter = new events.EventEmitter();
		this.on('next', function (value) {
			received.push(value);	
			if (received.lenght == n) {
				emitter.emit('next', received);
				received = [];
			}
		});
		return _.extend(emitter, stepEmitter);
	}
};	

function compositeSource (list) {
	var eventEmitter = new events.EventEmitter();
	lazy(list)
		.async(1000)
		.each(_.bind(eventEmitter.emit, eventEmitter, 'next'));

	return _.extend(eventEmitter, stepEmitter);
}

compositeSource(numbers)
	.map(mulByConstant)
	.buffer(3)
	.forEach(print)