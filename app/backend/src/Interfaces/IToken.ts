import IUser from './IUser';

export type IToken = Omit<IUser, 'password'>;
