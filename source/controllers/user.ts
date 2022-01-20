import { Request, Response, NextFunction } from "express";
import mongoose, { NativeError } from "mongoose";
import bcrypt from "bcrypt";
import User from "../../models/user";
import logging from "../config/logging";
import { Iuser } from "../../interfaces/user";

const NAMESPACE = "USER CONTROLLER";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    ...body,
    scores: 0,
    wins: 0,
    losses: 0,
  });

  try {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;

    try {
      const result = await user.save();
      logging.info(NAMESPACE, "Added to database: ", result);
      res.status(201).json({ user: result });

    } catch (error: any) {
      logging.error(NAMESPACE, "Error adding to database", error);
      res.status(500).json({
        message: error.message,
        error,
      });
    }
    
  } catch (error: any) {
    logging.error(NAMESPACE, "Hashed password.");
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
    logging.error(NAMESPACE, "Database error.");
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
    logging.error(NAMESPACE, "User record not found");
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
      logging.error(NAMESPACE, "User record not updated.");
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
    logging.error(NAMESPACE, "User record not found.");
    res.status(500).json({ message: error.message, error });
  }
};

export default { createUser, readAllUsers, updateUserScore, deleteUser };
