import { Router } from 'express';
import userController from '../controllers/User.controller';

const userRouter = Router();

userRouter.post('/register', userController.register);

userRouter.post('/login', userController.userLogin);

export default userRouter;
