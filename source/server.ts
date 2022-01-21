import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import path from "path";
import favicon from "serve-favicon";
// utils
import logging from "./config/logging";
import config from "./config";
// routes
import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";

const NAMESPACE = "SERVER";

const server = express();

// parse requests
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// connect to mongo
mongoose
  .connect(config.mongo.url, config.mongo.options)
  .then(() => {
    logging.info(NAMESPACE, "Connected to mongoDB.");
  })
  .catch((error) => {
    logging.error(NAMESPACE, error.message, error);
  });

// logging the request
server.use((req: Request, res: Response, next: NextFunction) => {
  logging.info(
    NAMESPACE,
    `METHOD = [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    logging.info(
      NAMESPACE,
      `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}] `
    );
  });
  next();
});

// api rules
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST PUT");
    return res.status(200).json();
  }
  next();
});

// session
server.use(session(config.session));

// passport
declare global {
  namespace Express {
    interface User {
      _id?: string;
    }
  }
}
require("./config/passport")(passport);

server.use(passport.initialize());
server.use(passport.session());


// routes
server.use("/api/users", userRoutes);
server.use("/api/auth", authRoutes);

// views
server.use(favicon(path.join(__dirname, "public", "favicon.ico")));

server.get("/", (req, res, next) => {
  res.send("<h1>The server is working</h1>");
});

server.listen(config.server.port, () =>
  logging.info(
    NAMESPACE,
    `Server runing on ${config.server.hostname}:${config.server.port}`
  )
);
