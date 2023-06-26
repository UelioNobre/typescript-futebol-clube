import { Response, Request } from 'express';
import UserService from '../services/user.service';
import TokenService from '../services/token.service';
import AuthErrorException from '../errors/auth.error';

export default class LoginController {
  public static async signin(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await UserService.findUserToLogin(email, password);

    const token = TokenService.create(user);

    return res.json({ token });
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
