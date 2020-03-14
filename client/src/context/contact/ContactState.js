import React, { useReducer } from "react";
import axios from "axios";

import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CLEAR_CONTACTS,
  UPDATE_CONTACT,
  CONTACT_ERROR
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
    loading: true
  };
  const config = {
    headers: {
      "Content-Type": "Application/json"
    }
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // GET CONTACTS
  const getContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");

      dispatch({
        type: GET_CONTACTS,
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR });
    }
  };

  // ADD CONTACT
  const addContact = async contact => {
    try {
      const res = await axios.post("/api/contacts", contact, config);
      dispatch({
        type: ADD_CONTACT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data.msg
      });
    }
  };

  // SET CURRENT
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // CLEAR CURRENT
  const clearCurrent = contact => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // DELETE CONTACT
  const deleteContact = async _id => {
    try {
      await axios.delete(`/api/contacts/${_id}`);
      dispatch({
        type: DELETE_CONTACT,
        payload: _id
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR
      });
    }
  };
  // FILTER CONTACT
  const filterContact = text =>
    dispatch({ type: FILTER_CONTACTS, payload: text });

  // CLEAR FILTER
  const clearFilter = () => dispatch({ type: CLEAR_FILTER });

  // CLEAR CONTACTS
  const clearContacts = () => dispatch({ type: CLEAR_CONTACTS });

  // UPDATE CONTACT
  const updateContact = async contact => {
    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data
      });
    } catch (err) {
      dispatch({ dispatch: CONTACT_ERROR });
    }
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        getContacts,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContact,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
