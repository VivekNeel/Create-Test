import React from "react";
import CreateFacts from "./CreateFacts";

import { withStyles } from "@material-ui/core/";
import ContentEditor from "./ContentEditor";
const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  term: {
    marginRight: 16,
    flex: 1,
  },
  facts: {
    flex: 1,
  },
};

const ContentItemRow = (props) => {
  const { term, classes, createTerm, autoFocus } = props;
  return (
    <div className={classes.container}>
      <div className={classes.term}>
        <ContentEditor
          autoFocus={autoFocus}
          createTerm={createTerm}
          placeholder={"New term"}
        />
      </div>
      <div className={classes.facts}>
        {term.facts.map(({ fact }) => {
          return (
            <ContentEditor
              key={fact.id}
              createTerm={createTerm}
              placeholder={"New fact"}
            />
          );
        })}
      </div>
    </div>
  );
};

export default withStyles(styles)(ContentItemRow);
