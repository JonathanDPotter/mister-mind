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

const googleLogin = (req: Request, res: Response) => {
  passport.authenticate("google", (error, user) => {
    if (error) throw error;
    req.logIn(user, (error) => {
      if (error) throw error;
      logging.info(NAMESPACE, "Successfully Authenticated: ", req.user);
      res.status(200).json(req.user);
    });
  });
};

const getAuth = (req: Request, res: Response) => {
  res.send(req.user);
  logging.info(NAMESPACE, "Getting user: ", req.user);
};

const logout = (req: Request) => {
  req.logOut();
  logging.info(NAMESPACE, "Logging out: ", req.user);
};

export default { localLogin, logout, getAuth, googleLogin };
