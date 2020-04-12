import React, { useState, useCallback } from "react";

import CreateTerms from "./CreateTerms";
import { initTerms, contructTermObject, contructFactObject } from "./utils";
import { Container } from "@material-ui/core/";

const CreateStudySetContainer = () => {
  const [terms, setTerms] = useState(initTerms);

  const [inputIdToFocus, setInputIdToFocus] = useState(null);

  const handleCreateTerm = useCallback(() => {
    setTerms((oldTerms) => {
      const newTerm = contructTermObject(oldTerms.length, 5);
      const newTerms = [...oldTerms, newTerm];
      setInputIdToFocus(oldTerms.length);
      return newTerms;
    });
  }, []);

  const handleInsertFact = useCallback((currentTermIndex) => {
    setTerms((oldTerms) => {
      const {
        node: { term: currentTerm },
      } = oldTerms[currentTermIndex];
      const newFact = contructFactObject(currentTerm.facts.length + 1);
      oldTerms[currentTermIndex].node.term = {
        ...currentTerm,
        facts: [...currentTerm.facts, newFact],
      };
      setInputIdToFocus(currentTerm.facts.length + 1);

      return [...oldTerms];
    });
  }, []);

  const handleMoveCard = useCallback((s, d) => {
    const move = (from, to, ...a) => (a.splice(to, 0, ...a.splice(from, 1)), a);
    setTerms((oldTerms) => {
      const shuffledTerms = move(s, d, ...oldTerms);
      return shuffledTerms;
    });
  }, []);

  const handleUpdateContentItem = useCallback(
    (type, value, termIndex, factIndex) => {
      if (type === "Term") {
        setTerms((oldTerms) => {
          const currentTerm = oldTerms[termIndex].node.term;
          oldTerms[termIndex].node.term = {
            ...currentTerm,
            name: value,
          };

          return [...oldTerms];
        });
      } else {
        setTerms((oldTerms) => {
          const currentTerm = oldTerms[termIndex];
          const currentFacts = currentTerm.node.term.facts;
          const currentFact = currentFacts[factIndex].fact;

          currentFacts[factIndex].fact = {
            ...currentFact,
            name: value,
          };

          return [...oldTerms];
        });
      }
    },
    []
  );
  return (
    <Container maxWidth={"md"}>
      <CreateTerms
        terms={terms}
        inputIdToFocus={inputIdToFocus}
        createTerm={handleCreateTerm}
        handleInsertFact={handleInsertFact}
        handleMoveCard={handleMoveCard}
        handleUpdateContentItem={handleUpdateContentItem}
      />
      ;
    </Container>
  );
};

export default CreateStudySetContainer;
