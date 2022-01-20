import mongoose, { Schema } from "mongoose";
import { Iuser } from "../interfaces/user";

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  scores: { type: Number, required: true },
  wins: { type: Number, required: true },
  losses: { type: Number, required: true },
});

export default mongoose.model<Iuser>("User", UserSchema);
