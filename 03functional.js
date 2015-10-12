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

_.forEach(_.map(numbers, mulByConstant), print);

var R = require('ramda');
var mapByConstant = R.map(mulByConstant);
var printEach = R.forEach(print);
var algorithm = R.compose(printEach, mapByConstant);

algorithm(numbers);
