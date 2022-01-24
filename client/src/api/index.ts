import axios from "axios";
import { IuserLogin } from "../interfaces/user";

// auth
const getAuth = async () => axios.get("/api/auth/get/auth");
const logIn = (credentials: IuserLogin) =>
  axios.post("/api/auth/login", credentials);
const logOut = () => axios.post("/api/auth/logout", { withCredentials: true });

const api = { getAuth, logIn, logOut };
export default api;
