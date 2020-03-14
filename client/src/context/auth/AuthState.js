import React, { useReducer } from "react";
import axios from "axios";

import setAuthToken from "../../components/utils/setAuthToken";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGOUT,
  CLEAR_ERRORS
} from "../types";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const config = {
    headers: {
      "Content-Type": "Application/json"
    }
  };
  // lOAD USER
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get("/api/auth");
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // LOGIN USER
  const login = async formData => {
    try {
      const res = await axios.post("/api/auth", formData, config);
      console.log(res);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };
  // REGISTER USER
  const register = async formData => {
    try {
      const res = await axios.post("/api/users", formData, config);
      console.log(res);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };
  // LOGOUT
  const logout = () => dispatch({ type: LOGOUT });

  // CLEAR ERROR
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        user: state.user,
        register,
        clearErrors,
        loadUser,
        login,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
