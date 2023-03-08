import { verify } from "jsonwebtoken";
import { HTTP_UNAUTHORIZED } from "../configs/errorCodes";
import errorMessages from "../configs/errorMsgs";
import { userRegistration } from "../models";
import { STAFF_ROLE } from "../constants/index";
verifyToken = async (req, res, next) => {
	let token = req.headers["x-access-token"] || req.headers["token"];
	if (token) {
		token = token.replace("Bearer ", "");
		return verify(token, process.env.JWT_SECRET, async (err, payload) => {
			if (err) {
				return res
					.status(HTTP_UNAUTHORIZED)
					.json({ errMessage: errorMessages[HTTP_UNAUTHORIZED] });
			} else {
				req.user = {};
				req.user = payload; // payload
				next();
			}
		});
	}
	return res
		.status(HTTP_UNAUTHORIZED)
		.json({ errMessage: errorMessages[HTTP_UNAUTHORIZED] });
};
export default verifyToken;
