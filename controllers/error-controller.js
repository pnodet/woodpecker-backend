// Express automatically knows that this entire function is an error handling middleware by specifying 4 parameters
export default (error, _request, res, _next) => {
	error.statusCode = error.statusCode || 500;
	error.status = error.status || 'error';

	res.status(error.statusCode).json({
		status: error.status,
		error,
		message: error.message,
		stack: error.stack,
	});
};
