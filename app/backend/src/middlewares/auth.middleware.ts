// import Joi = require('joi');

import { Request, Response, NextFunction } from 'express';
import AuthErrorException from '../errors/auth.error';
import TokenService from '../services/token.service';

// import LoginErrorException from '../errors/login.error';

// const joiLogin = Joi.object({
//   email: Joi.string().email({
//     minDomainSegments: 2,
//     tlds: {
//       allow: ['com', 'net'],
//     },
//   }),
//   password: Joi.string().min(6),
// });

export default class AuthMiddleware {
  static async tokenRequired(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      throw new AuthErrorException('Token not found');
    }

    next();
  }

  static async tokenHasBeenValid(req: Request, res: Response, next: NextFunction) {
    const { headers: { authorization } } = req;

    if (!authorization) {
      throw new AuthErrorException('Token not found');
    }

    const token = !!TokenService.decoded(authorization);

    if (!token) {
      throw new AuthErrorException('Token must be a valid token');
    }

    next();
  }
}
