import { Document } from "mongoose";

export interface Iuser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  admin: boolean;
  avatar: number;
}

export interface InewUser {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  admin: boolean;
  avatar: number;
}

export interface IuserLogin {
  username: string;
  password: string;
}
