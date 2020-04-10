import React from "react";
import ContentEditor from "./ContentEditor";
import { withStyles } from "@material-ui/core/";
import EditorFact from "./EditorFact";

const styles = () => ({
  facts: {
    flex: 1,
    marginLeft: 20,
  },
  fact: {
    paddingBottom: 16,
    "&$isDragging": {
      borderColor: "blue",
      borderWidth: 2,
      borderRadius: 6,
      borderStyle: "solid",
    },
  },
  isDragging: {},
});
const CreateFacts = (props) => {
  const { facts, classes, createTerm, termId } = props;

  const renderRow = ({ fact }, index) => {
    return (
      <div key={fact.id}>
        <EditorFact createTerm={createTerm} id={fact.id} index={fact.ord} />
      </div>
    );
  };
  const handleOnDragEnd = () => {};
  return <div className={classes.facts}>{facts.map(renderRow)}</div>;
};
export default withStyles(styles)(CreateFacts);
