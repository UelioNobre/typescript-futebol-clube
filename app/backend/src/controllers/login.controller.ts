import { Response, Request } from 'express';
import LoginErrorException from '../errors/login.error';
import UserService from '../services/user.service';
import TokenService from '../services/token.service';
import AuthErrorException from '../errors/auth.error';

export default class LoginController {
  public static async signin(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await UserService.findUserToLogin(email, password);

    try {
      const token = TokenService.create(user);
      return res.json({ token });
    } catch (error) {
      throw new LoginErrorException('Invalid email or password');
    }
  }

  public static async showRole(req: Request, res: Response) {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new AuthErrorException('Token not found');
    }

    try {
      const { role } = TokenService.decoded(authorization);
      return res.json({ role });
    } catch (error) {
      throw new AuthErrorException('Token must be a valid token');
    }
  }
}
