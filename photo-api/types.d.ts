import { Model } from 'mongoose';
import { resolveSrv } from 'dns';

export interface UserFields {
  email: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  avatar: string;
  googleID?: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}
export type UserModal = Model<UserFields, {}, UserMethods>;

export interface Author {
  _id: string;
  displayName: string;
}
export interface PictureApi {
  _id: string;
  title: string;
  image: string | null;
  user: Author;
  createdAt: string;
}
export interface PictureMutation {
  title: string;
  image: string | null;
  user: string;
}
