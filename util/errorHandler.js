const asyncWrapper = (fn) => {
	return async function (ctx, next) {
		try {
			return await fn(ctx);
		} catch (error) {
			console.error(error);
			await ctx.reply('Something went wrong!');
			return next();
		}
	};
};

module.exports = asyncWrapper;
