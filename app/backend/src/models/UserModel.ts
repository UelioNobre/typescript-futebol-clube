import { IUserModel } from '../Interfaces/IUserModel';
import IUser from '../Interfaces/IUser';
import SequelizeUser from '../database/models/SequelizeUser';
import AuthErrorException from '../errors/auth.error';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findByEmail(email: string): Promise<IUser> {
    const user = await this.model.findOne({ where: { email } });

    if (!user) {
      throw new AuthErrorException('Invalid email or password');
    }

    return user;
  }
}
