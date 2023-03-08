import msg from "../utils/errorMsgs.js";
import db from "./db.config.js";
import * as statusCode from "../utils/errorCodes.js";

export const dbConfig = db;
export const message = msg;
export const status = statusCode;