import { NextFunction, Request, Response } from "express";
import passport from "passport";
import bcrypt from "bcrypt";
import logging from "../config/logging";
import User from "../../models/user";

const NAMESPACE = "Auth Controller";

const localLogin = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", (error, user) => {
    if (error) throw error;
    if (!user) res.status(403).json("password doesn't match");
    else {
      req.logIn(user, (error) => {
        if (error) throw error;
        logging.info(NAMESPACE, "Succesfully Authenticated: ", req.user);
        res.status(200).json(req.user);
      });
    }
  })(req, res, next);
};

const googleLogin = () => {
  passport.authenticate("google", { scope: ["profile"] });
};

const googleCallback = () => {
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/retgister",
  }),
    (req: Request, res: Response) => {
      res.redirect("http://localhost:3000");
    };
};

const getAuth = (req: Request, res: Response) => {
  res.send(req.user);
  logging.info(NAMESPACE, "Getting user: ", req.user);
};

const logout = (req: Request) => {
  req.logOut();
  logging.info(NAMESPACE, "Logging out: ", req.user);
};

export default { localLogin, logout, getAuth, googleLogin, googleCallback };
