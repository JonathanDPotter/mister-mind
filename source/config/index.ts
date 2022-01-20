import dotenv from "dotenv";
import MongoStore from "connect-mongo";

dotenv.config();

const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  autoIndex: false,
  retryWrites: false,
};

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_DATABASE = process.env.MONGO_DATABASE;

const MONGO = {
  host: MONGO_HOST,
  username: MONGO_USERNAME,
  password: MONGO_PASSWORD,
  database: MONGO_DATABASE,
  options: MONGO_OPTIONS,
  url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}`,
};

const SERVER_HOSTNAME = process.env.HOSTNAME;
const SERVER_PORT = process.env.PORT;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

const SESSION = {
  secret: process.env.SESSION_SECRET || "secret",
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: MONGO.url,
    autoRemove: "native",
  }),
};

const config = {
  server: SERVER,
  mongo: MONGO,
  session: SESSION,
};

export default config;
