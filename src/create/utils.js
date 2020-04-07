const contructFactObject = (index) => {
  return {
    fact: {
      id: index,
      name: `${index}-fact`,
    },
  };
};
const contructTermObject = (index, howManyFacts) => {
  const facts = [...Array(howManyFacts)].map((item, index) => {
    return contructFactObject(index);
  });

  const term = {
    node: {
      term: {
        id: index,
        name: `${index}-term`,
        facts,
      },
    },
  };
  return term;
};

const initTerms = () => {
  return [...Array(200)].map((item, index) => {
    return contructTermObject(index, index);
  });
};

export { initTerms, contructTermObject };
