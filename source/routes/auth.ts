import express from "express";
import controller from "../controllers/auth";

const Router = express.Router();

Router.post("/login", controller.localLogin);

Router.get("/google", controller.googleLogin);

Router.get(
  "/google/callback",controller.googleCallback);

Router.post("/get/auth", controller.getAuth);

Router.post("/logout", controller.logout);

export default Router;
