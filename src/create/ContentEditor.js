import React, { useRef } from "react";

import { TextField } from "@material-ui/core/";

const ContentEditor = (props) => {
  const {
    placeholder,
    createTerm,
    autoFocus,
    handleInsertFact,
    currentTermIndex,
    setCurrentTermIndex,
    id,
  } = props;

  const handleOnKeyDown = (event) => {
    const { keyCode } = event;
    if (keyCode === 13) {
      createTerm();
    }
    if (keyCode === 9) {
      handleInsertFact(currentTermIndex);
    }
  };

  const handleSetCurrentTermId = () => {
    setCurrentTermIndex(currentTermIndex);
  };

  return (
    <TextField
      onKeyDown={handleOnKeyDown}
      fullWidth
      multiline
      autoFocus={autoFocus}
      onClick={handleSetCurrentTermId}
      placeholder={placeholder}
    />
  );
};

export default ContentEditor;
