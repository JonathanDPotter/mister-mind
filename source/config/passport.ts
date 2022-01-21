import { Iuser } from "../../interfaces/user";
import User from "../../models/user";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { NativeError } from "mongoose";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

module.exports = (passport: any) => {
  passport.use(
    new LocalStrategy((username: string, password: string, done: any) => {
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

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID || "id",
        clientSecret: GOOGLE_CLIENT_SECRET || "string",
        callbackURL: "/auth/google/callback",
        passReqToCallback: true,
      },

      async (req, accessToken, refreshToken, profile, done) => {
        const { id, displayName, name, photos } = profile;
        let image = "null";
        if (photos) image = photos[0].value;

        const newUser = {
          googleId: id,
          displayName,
          firstName: name?.givenName,
          lastName: name?.familyName,
          image,
        };

        try {
          let user = await User.findOne({ googleId: id });
          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (error) {
          console.error(error);
        }
      }
    )
  );

  passport.serializeUser((user: Iuser, done: any) => done(null, user.id));

  passport.deserializeUser((id: string, done: any) =>
    User.findById({ id }, (error: Error, user: Iuser) => done(error, user))
  );
};
