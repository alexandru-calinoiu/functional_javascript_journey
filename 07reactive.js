var numbers = [3, 1, 7];
var constant = 2;

function print(n) {
	console.log(n);
};

function mul(a, b) { 
	return a * b;
}

var Rx = require('rx');
var _ = require('lodash');

var mulByConstant = _.partial(mul, constant);

var timeEvents = Rx.Observable
	.interval(1000)
	.timeInterval();

var numberEvents = Rx.Observable
	.fromArray(numbers);

Rx.Observable.zip(timeEvents, numberEvents, function pickValue (t, n) { return n; })
	.map(mulByConstant)
	.subscribe(print)
