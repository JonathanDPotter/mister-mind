import express from "express";
import controller from "../controllers/user";

const Router = express.Router();

Router.post("/create/user", controller.createUser);

Router.post("/update/score", controller.updateUserScore);

Router.get("/get/users", controller.readAllUsers);

Router.delete("/delete/user", controller.deleteUser);

export default Router;
