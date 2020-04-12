const contructFactObject = (index) => {
  return {
    fact: {
      id: index + 1,
      name: `${index}-fact`,
      ord: index,
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
        ord: index,
      },
    },
  };
  return term;
};

const initTerms = () => {
  return [...Array(14)].map((item, index) => {
    return contructTermObject(index, 2);
  });
};

export { initTerms, contructTermObject, contructFactObject };
