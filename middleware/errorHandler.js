import { message, status } from '../configs/index.js';

// error handler middleware
export default (err, req, res, next) => {
	const code = err.status ? err.status : 500;
	if (err.message === 'Validation error') {
		err.message = message.exist;
		err.status = 400;
	}
	switch (code) {
		case status.HTTP_UNPROCESSABLE_ENTITY: {
			let error = err.details.reduce((prev, curr) => {
				prev[curr.path[0]] = curr.message.replace(/"/g, "");
				return prev;
			}, {});
			let msg = Object.values(error).length ? Object.values(error).join(', ') : message[400];
			err.message = msg
			crateLogs(req, err)
			return res.status(code).json({
				status: code,
				message: msg,
				// error
			});
		}

		default: {
			crateLogs(req, err)
			return res.status(err.status || 500).json({
				status: err.status || 500,
				message: err.message || 'Internal Server Error',
			});
		}
			break;
	};

	function crateLogs(req, err) {
		req.appLogger.error(
			`IP - ${req.ip} | URL : ${req.protocol}://${req.get("host")}${
			req.originalUrl
			} | ${req.method} | Request : ${JSON.stringify(
				req.body ? req.body : {}
			)} | Error : ${err.message}`
		);
	}
};