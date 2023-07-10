import { Request, Response, NextFunction } from 'express';
import LoginErrorException from '../errors/login.error';
import AuthErrorException from '../errors/auth.error';
import NotFoundErrorException from '../errors/notFound.error';

export default class ErrorMiddleware {
  static handler(error: Error, _req: Request, res: Response, _next: NextFunction) {
    const { message } = error;

    if (error instanceof LoginErrorException) {
      return res.status(400).json({ message });
    }

    if (error instanceof AuthErrorException) {
      return res.status(401).json({ message });
    }

    if (error instanceof NotFoundErrorException) {
      return res.status(404).json({ message });
    }

    return res.status(500).json({ message });
  }
}
