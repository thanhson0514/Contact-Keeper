import React, { useState, useContext, useEffect } from "react";

import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Login = props => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = user;
  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (error) {
      setAlert(error, "danger");
      clearErrors();
    }
    if (isAuthenticated) {
      props.history.push("/");
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const onSubmit = e => {
    e.preventDefault();
    login({
      email,
      password
    });
  };

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Login;
