import React from "react";

import { TextField } from "@material-ui/core/";

const ContentEditor = (props) => {
  const { placeholder, createTerm, autoFocus } = props;

  const handleOnKeyDown = (event) => {
    const { keyCode } = event;
    if (keyCode === 13) {
      createTerm();
    }
  };
  return (
    <TextField
      onKeyDown={handleOnKeyDown}
      fullWidth
      autoFocus={autoFocus}
      placeholder={placeholder}
    />
  );
};

export default ContentEditor;
