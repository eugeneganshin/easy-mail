const three = (req, res, next) => {
	console.log('three test1');
	return next();
};

const four = (req, res, next) => {
	console.log('four test1');
	return next();
};

module.exports = {
	three,
	four,
};
