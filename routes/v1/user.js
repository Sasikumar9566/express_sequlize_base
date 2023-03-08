import { Router } from "express";
const userRoutes = Router();
import { loginUser, verifyUser } from '../../middleware/user.validator.js';
import { userController } from '../../controllers/index.js';

// Open Routes
userRoutes.post('/login', loginUser, userController.login)

export default userRoutes;
