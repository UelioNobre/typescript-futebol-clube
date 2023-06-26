import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import LoginMiddleware from '../middlewares/login.middleware';

const LoginRouter = Router();

LoginRouter.post(
  '/',
  LoginMiddleware.validateLogin,
  LoginController.signin,
);

LoginRouter.get(
  '/role',
  LoginController.showRole,
);

export default LoginRouter;
