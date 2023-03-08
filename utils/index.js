import { genSaltSync, hashSync } from "bcrypt";
import { HTTP_UNAUTHORIZED } from "../configs/errorCodes";
import errorMessages from "../configs/errorMsgs";
export const errorHandler = require("./errorHandler");
export function generateOtp(data) {
	var chars = "0123456789", result = "";
	for (var i = data; i > 0; --i)
		result += chars[Math.round(Math.random() * (chars.length - 1))];
	return result;
}
export function generatePassword(data) {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrtsuvwxyz", result = "";
	for (var i = data; i > 0; --i)
		result += chars[Math.round(Math.random() * (chars.length - 1))];
	return result;
}
export function genHash(data) {
	let salt = genSaltSync(8);
	return hashSync(data, salt);
}
export function generateUserId(data) {
	var chars = "0123456789", result = "";
	for (var i = data; i > 0; --i)
		result += chars[Math.round(Math.random() * (chars.length - 1))];
	return result;
}
export const verifyToken = require("./verifyToken").default;
export function hasRole(role) {
	return function (req, res, next) {
		if (role !== req.user.role) {
			return res
				.status(HTTP_UNAUTHORIZED)
				.json({ errMessage: errorMessages[HTTP_UNAUTHORIZED] });
		} else
			next();
	};
}
