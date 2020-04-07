import React, { useState } from "react";

import CreateTerms from "./CreateTerms";
import { initTerms, contructTermObject } from "./utils";
import { Container } from "@material-ui/core/";

const CreateStudySetContainer = () => {
  const [terms, setTerms] = useState(initTerms);

  const [inputIdToFocus, setInputIdToFocus] = useState(null);

  const handleCreateTerm = () => {
    const newTerm = contructTermObject(terms.length + 1, 2);
    const newTerms = [...terms, newTerm];
    setInputIdToFocus(terms.length + 1);
    setTerms(newTerms);
  };
  console.log("....rendering");
  return (
    <Container maxWidth={"md"}>
      <CreateTerms
        terms={terms}
        inputIdToFocus={inputIdToFocus}
        createTerm={handleCreateTerm}
      />
      ;
    </Container>
  );
};

export default CreateStudySetContainer;
