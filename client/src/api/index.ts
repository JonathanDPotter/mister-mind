import axios from "axios";
import { IuserLogin } from "../interfaces/user";

// auth
const getAuth = () => axios.get("/api/auth/get/auth");

const logIn = (credentials: IuserLogin) =>
  axios.post("/api/auth/login", credentials);

const logOut = () => axios.post("/api/auth/logout", { withCredentials: true });

// user
const createUser = (credentials: IuserLogin) =>
  axios.post("/api/users/create/user", credentials);

const api = { getAuth, logIn, logOut, createUser };

export default api;
