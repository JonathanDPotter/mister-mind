import React, { FormEvent, useState } from "react";
// types
import { IuserLogin } from "../../interfaces/user";
// utils
import api from "../../api";
// icons
import { FaGoogle } from "react-icons/fa";
import Modal from "../Modal/Modal";

const Register = () => {
  const initialState = { username: "", password: "", passwordTwo: "" };
  const [state, setState] = useState(initialState);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const { username, password, passwordTwo } = state;

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { id, value } = event.currentTarget;

    if (id === "username")
      setState({ ...state, username: value.toLowerCase() });
    if (id === "password") setState({ ...state, password: value });
    if (id === "password-two") setState({ ...state, passwordTwo: value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const newUser: IuserLogin = { username, password };
    const response = await api.createUser(newUser);
    const { message } = response.data;
    if (message === "username already exists") {
      setModalMessage(message);
      setState({ ...state, username: "" });
    } else {
      setModalMessage(message);
      setState(initialState);
    }
  };

  const handleGoogle = async () => {
    window.open("http://localhost:1337/api/auth/google");
  };

  return (
    <div className="page">
      <div className="card row wide">
        <div className="left">
          <button onClick={handleGoogle}>
            <FaGoogle />
            <span>Login with Google</span>
          </button>
        </div>
        <div className="middle"></div>
        <div className="right">
          <form action="submit" onSubmit={handleSubmit}>
            <div className="label-input">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                name="username"
                id="username"
                onChange={handleChange}
                value={username}
                autoComplete={"none"}
                autoFocus
                onFocus={(event) => event.currentTarget.select()}
                required
              />
            </div>
            <div className="label-input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                value={password}
                autoComplete={"none"}
                required
              />
            </div>
            <div className="label-input">
              <label htmlFor="password-two">Repeat Password</label>
              <input
                type="password"
                name="password-two"
                id="password-two"
                onChange={handleChange}
                value={passwordTwo}
                autoComplete={"none"}
                required
              />
            </div>
            <span style={{ height: "1rem" }}>
              {password &&
                passwordTwo &&
                password !== passwordTwo &&
                "Passwords Must Match!!"}
            </span>
            <button
              type="submit"
              disabled={!(username && password && password === passwordTwo)}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      {modalMessage && (
        <Modal
          message={modalMessage}
          buttonMessage={"Close"}
          closeModal={() => setModalMessage(null)}
        />
      )}
    </div>
  );
};

export default Register;
