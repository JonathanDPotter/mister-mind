import { Document } from "mongoose";

export interface Iuser extends Document {
  username: string;
  password: string;
  scores: number;
  wins: number;
  losses: number;
}
