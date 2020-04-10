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
        id: index + 1,
        name: `${index}-term`,
        facts,
        ord: index,
      },
    },
  };
  return term;
};

const initTerms = () => {
  return [...Array(3000)].map((item, index) => {
    return contructTermObject(index, 6);
  });
};

export { initTerms, contructTermObject };
