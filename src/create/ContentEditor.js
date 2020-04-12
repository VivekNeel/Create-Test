import React, { useRef } from "react";

import { TextField } from "@material-ui/core/";

let timeout;
const ContentEditor = (props) => {
  const {
    placeholder,
    createTerm,
    autoFocus,
    handleInsertFact,
    currentTermIndex,
    setCurrentTermIndex,
    contentItemType,
    handleUpdateContentItem,
    currentFactIndex,
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

  const handleOnChange = (event) => {
    const {
      target: { value },
    } = event;

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (contentItemType === "Term") {
        handleUpdateContentItem(contentItemType, value, currentTermIndex);
      } else {
        handleUpdateContentItem(
          contentItemType,
          value,
          currentTermIndex,
          currentFactIndex
        );
      }
    }, 2000);
  };
  return (
    <TextField
      onKeyDown={handleOnKeyDown}
      fullWidth
      multiline
      autoFocus={autoFocus}
      onChange={handleOnChange}
      onClick={handleSetCurrentTermId}
      placeholder={placeholder}
    />
  );
};

export default ContentEditor;
