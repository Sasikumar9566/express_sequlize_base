import { userService } from '../services/index.js';
import { message, status } from "./../configs/index.js";
import { UserStatus } from '../constants/index.js';
import jwt from 'jsonwebtoken';

class userController {
    async login(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

export default new userController()