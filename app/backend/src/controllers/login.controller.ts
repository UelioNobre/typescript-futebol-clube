import { Response, Request } from 'express';
import UserService from '../services/user.service';
import TokenService from '../services/token.service';

export default class LoginController {
  public static async signin(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await UserService.findUserToLogin(email, password);

    const token = TokenService.create(user);

    return res.json({ token });
  }
}
