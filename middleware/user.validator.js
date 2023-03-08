import Joi from 'joi';
import { HTTP_UNPROCESSABLE_ENTITY } from '../utils/errorCodes.js';

// add joi schema
const schemas = {
    verifyUser: Joi.object().keys({
        token: Joi.string().required(),
    }),
    loginUser: Joi.object().keys({
        emailId: Joi.string().email().required(),
        password: Joi.string().min(4).required()
    })
};

const options = {
    basic: {
        abortEarly: false,
        convert: true,
        allowUnknown: false,
        stripUnknown: true
    },
    array: {
        abortEarly: false,
        convert: true,
        allowUnknown: true,
        stripUnknown: {
            objects: true
        }
    }
};

export const verifyUser = async (req, res, next) => {
    try {
        let schema = schemas.verifyUser;
        let option = options.basic;
        await schema.validateAsync({ ...req.query }, option);
        next()
    } catch (err) {
        err.status = HTTP_UNPROCESSABLE_ENTITY
        next(err)
    }
}

export const loginUser = async (req, res, next) => {
    try {
        let schema = schemas.loginUser;
        let option = options.basic;
        await schema.validateAsync({ ...req.body }, option);
        next()
    } catch (err) {
        err.status = HTTP_UNPROCESSABLE_ENTITY
        next(err)
    }
};