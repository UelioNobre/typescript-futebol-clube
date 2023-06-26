import { compare } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import IUser from '../Interfaces/IUser';

export default class TokenService {
  private static jwtSecret = process.env.JWT_SECRET || 'jwt_secret';
  public static async verifyPassword(raw: string, decoded: string): Promise<boolean> {
    const isTheCorrect = await compare(raw, decoded);

    if (!isTheCorrect) {
      throw new Error('PASSWORD INCORRECT');
    }

    return true;
  }

  public static create(payload: IUser) {
    const { id, username, role, email } = payload;
    return jwt.sign({ id, username, role, email }, TokenService.jwtSecret);
  }
}
