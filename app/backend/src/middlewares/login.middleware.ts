import { Request, Response, NextFunction } from 'express';
import Joi = require('joi');

import LoginErrorException from '../errors/login.error';
import AuthErrorException from '../errors/auth.error';

const joiLogin = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: {
      allow: ['com', 'net'],
    },
  }),
  password: Joi.string().min(6),
});

export default class LoginMiddleware {
  static async validateLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new LoginErrorException('All fields must be filled');
    }

    try {
      await joiLogin.validateAsync(req.body);
    } catch (error) {
      throw new AuthErrorException('Invalid email or password');
    }

    next();
  }
}
