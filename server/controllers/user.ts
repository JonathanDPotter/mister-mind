import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../../models/user";
import logging from "../config/logging";

const NAMESPACE = "USER CONTROLLER";

dotenv.config();

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    ...body,
  });

  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    user
      .save()
      .then((result) => {
        logging.info(NAMESPACE, "[ADDED TO DB]: ", result);
        return res.status(201).json({ user: result });
      })
      .catch((error) => {
        logging.error(NAMESPACE, "[ERROR]: ", error);
        return res.status(500).json({
          message: error.message,
          error,
        });
      });
  });
};

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find()
    .exec()
    .then((result) => {
      logging.info(NAMESPACE, "[GET ALL USERS]");
      return res.status(200).json({
        users: result,
        count: result.length,
      });
    })
    .catch((error) => {
      logging.error(NAMESPACE, "[ERROR]", error);
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

export default { createUser, getAllUsers };
