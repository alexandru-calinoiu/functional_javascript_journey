var numbers = [3, 1, 7];
var constant = 2;

function mul(a, b) { 
	return a * b;
}

function print(n) {
	console.log(n);
};

var _ = require('lodash');
var mulByConstant = _.partial(mul, constant);

var lazy = require('lazy.js');
lazy(numbers)
	.take(2)
	.map(mulByConstant)
	.each(print)

lazy(numbers)
	.async(1000)
	.take(2)
	.map(mulByConstant)
	.each(print)
