import React, { FormEvent, useState } from "react";
import { FaGoogle } from "react-icons/fa";

const Register = () => {
  const initialState = { username: "", password: "", passwordTwo: "" };
  const [state, setState] = useState(initialState);
  const { username, password, passwordTwo } = state;

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { id, value } = event.currentTarget;

    if (id === "username") setState({ ...state, username: value });
    if (id === "password") setState({ ...state, password: value });
    if (id === "password-two") setState({ ...state, passwordTwo: value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.table(state);
    setState(initialState);
  };

  return (
    <div className="page">
      <div className="card row wide">
        <div className="left">
          <button>
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
    </div>
  );
};

export default Register;
