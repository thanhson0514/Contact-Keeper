import React, { useRef, useContext } from "react";

import ContactContact from "../../context/contact/contactContext";

const ContactFilter = () => {
  const text = useRef("");
  const contactContext = useContext(ContactContact);

  const { filterContact, clearFilter } = contactContext;

  const onChange = e => {
    if (text.current.value) {
      filterContact(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        type="text"
        ref={text}
        placeholder="Filter Contact..."
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
