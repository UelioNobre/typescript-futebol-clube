import AuthErrorException from '../errors/auth.error';
import UserModel from '../models/UserModel';
import TokenService from './token.service';
// import { ID } from '../Interfaces';
// import TeamsModel from '../models/TeamsModel';

export default class UserService {
  public static async findUserToLogin(email: string, password: string) {
    const userModel = new UserModel();
    const user = await userModel.findByEmail(email);

    try {
      await TokenService.verifyPassword(password, user.password);
      const { id, username, role } = user;

      return { id, username, role, email };
    } catch (error) {
      throw new AuthErrorException('Invalid email or password');
    }
  }
}
