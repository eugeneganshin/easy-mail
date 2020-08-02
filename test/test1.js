const one = (req, res, next) => {
	console.log('one test1');
	return next();
};

const two = (req, res, next) => {
	console.log('two test1');
	return next();
};

module.exports = {
	one,
	two,
};
