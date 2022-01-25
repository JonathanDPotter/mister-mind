import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../../models/user";
import logging from "../config/logging";
import { Iuser } from "../../interfaces/user";

const NAMESPACE = "USER CONTROLLER";

const logError = (error: any) => {
  logging.error(NAMESPACE, error.message, error);
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const exists = await User.findOne({ username: req.body.username });

  if (exists) {
    logging.info(NAMESPACE, "username already exists", req.body);
    res.status(200).json({ message: "username already exists" });
  }
  if (!exists) {
    const user = await User.create({
      ...req.body,
      scores: 0,
      wins: 0,
      losses: 0,
    });

    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;

    user.save((error: any) => {
      if (error) {
        logError(error);
      } else {
        logging.info(NAMESPACE, "Added to database: ", user);
        res
          .status(201)
          .json({ user: user, message: `${user.username} registered.` });
      }
    });
  }
};

const readAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await User.find();
    logging.info(NAMESPACE, "Getting all users.");
    res.status(200).json({
      users: result,
      count: result.length,
    });
  } catch (error: any) {
    logError(error);
    res.status(500).json({ message: error.message, error });
  }
};

const updateUserScore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, score } = req.body;

  let doc: Iuser | null = new User();

  try {
    doc = await User.findOne({ _id: id });
  } catch (error) {
    logError(error);
  }

  if (doc) {
    const newScores = {
      scores: doc.scores,
      wins: doc.wins,
      losses: doc.losses,
    };

    newScores.scores = newScores.scores + 1;

    if (score === 1) {
      newScores.wins = newScores.wins + 1;
    } else {
      newScores.losses = newScores.losses + 1;
    }

    try {
      const result = await User.findOneAndUpdate(
        { _id: doc._id },
        { ...newScores },
        { new: true }
      );
      res.status(200).json(result);
    } catch (error: any) {
      logError(error);
      res.status(500).json({ message: error.message, error });
    }
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;

  try {
    const deleted = await User.findOneAndDelete({ _id: id });
    res.status(200).json({ deleted });
  } catch (error: any) {
    logError(error);
    res.status(500).json({ message: error.message, error });
  }
};

export default { createUser, readAllUsers, updateUserScore, deleteUser };
