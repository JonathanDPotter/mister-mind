import express from "express";
import controller from "../controllers/user";

const Router = express.Router();

const createRoute = Router.post("/create/user", controller.createUser);

const getAllRoute = Router.get("/get/users", controller.getAllUsers);

export default Router;