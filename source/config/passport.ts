import { Iuser } from "../../interfaces/user";
import User from "../../models/user";
import bcrypt from "bcrypt";
import { Strategy as localStrategy } from "passport-local";
import { NativeError } from "mongoose";

module.exports = (passport: any) => {
  passport.use(
    new localStrategy((username: string, password: string, done: any) => {
      User.findOne({ username }, (error: NativeError, user: Iuser) => {
        if (error) done(error);
        if (!user) return done(null, false, { message: "Username not found" });
        bcrypt.compare(password, user.password, (error, result) => {
          if (error) done(error);
          if (result) {
            return done(null, user, { message: "Successfully logged in." });
          } else {
            return done(null, false, { message: "Password incorrect." });
          }
        });
      });
    })
  );

  passport.serializeUser((user: Iuser, done: any) => done(null, user.id));

  passport.deserializeUser((id: string, done: any) =>
    User.findOne({ _id: id }, (error: Error, user: Iuser) => done(error, user))
  );
};
