import React from "react";
import CreateFacts from "./CreateFacts";

import { withStyles, Card } from "@material-ui/core/";
import ContentItemRow from "./ContentItemRow";
const styles = () => ({
  card: {
    marginBottom: 16,
  },
});
const CreateTerms = (props) => {
  const { terms, classes, createTerm, inputIdToFocus } = props;
  return (
    <div className={classes.container}>
      {terms.map(({ node: { term } }, index) => {
        return (
          <Card key={term.id} className={classes.card}>
            <p>{index}</p>
            <ContentItemRow
              autoFocus={term.id === inputIdToFocus}
              createTerm={createTerm}
              term={term}
            />
            ;
          </Card>
        );
      })}
    </div>
  );
};

export default withStyles(styles)(CreateTerms);
