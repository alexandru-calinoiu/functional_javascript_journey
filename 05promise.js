var numbers = [3, 1, 7];
var constant = 2;

function print(n) {
	console.log(n);
};

var _ = require('lodash');

var Q = require('q');

function mulAsync (a, b) {
	return Q(a * b).delay(1000);
}

var mulByConstantAsync = _.partial(mulAsync, constant);
var promisetoMulNumber = function (n) {
	return mulByConstantAsync(n);
}

Q.all(numbers.map(promisetoMulNumber))
	.then(print)
	.done();
