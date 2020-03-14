import React, { useState, useContext, useEffect } from "react";

import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Register = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  const { setAlert } = alertContext;
  const { register, error, isAuthenticated, clearErrors } = authContext;
  const { name, email, password, password2 } = user;

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
    if (password !== password2) {
      setAlert("Confirm password is not equal!", "danger");
    } else {
      register({
        name,
        email,
        password
      });
    }
  };

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
            required="Please add name!"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}
            required="Please add email!"
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
            required="Please add password!"
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            placeholder="confirm password"
            name="password2"
            value={password2}
            onChange={onChange}
            required="Please add password!"
            minLength="6"
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
