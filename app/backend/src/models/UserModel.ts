import { IUserModel } from '../Interfaces/IUserModel';
import IUser from '../Interfaces/IUser';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findByEmail(email: string): Promise<IUser> {
    const user = await this.model.findOne({ where: { email } });

    if (!user) {
      throw new Error('USER NOT FOUND.');
    }

    return user;
  }
}
