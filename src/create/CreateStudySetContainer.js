import React, { useState, useCallback } from "react";

import CreateTerms from "./CreateTerms";
import { initTerms, contructTermObject } from "./utils";
import { Container } from "@material-ui/core/";

const CreateStudySetContainer = () => {
  const [terms, setTerms] = useState(initTerms);

  const [inputIdToFocus, setInputIdToFocus] = useState(null);

  const handleCreateTerm = useCallback(() => {
    setTerms((oldTerms) => {
      const newTerm = contructTermObject(oldTerms.length + 1, 2);
      const newTerms = [...oldTerms, newTerm];
      setInputIdToFocus(oldTerms.length + 1);
      return newTerms;
    });
  }, []);

  const handleMoveCard = useCallback((s, d) => {
    const move = (from, to, ...a) => (a.splice(to, 0, ...a.splice(from, 1)), a);
    setTerms((oldTerms) => {
      const shuffledTerms = move(s, d, ...oldTerms);
      return shuffledTerms;
    });
  }, []);
  return (
    <Container maxWidth={"md"}>
      <CreateTerms
        terms={terms}
        inputIdToFocus={inputIdToFocus}
        createTerm={handleCreateTerm}
        handleMoveCard={handleMoveCard}
      />
      ;
    </Container>
  );
};

export default CreateStudySetContainer;
