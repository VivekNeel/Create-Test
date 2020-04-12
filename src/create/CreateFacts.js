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
  const {
    facts,
    classes,
    createTerm,
    setCurrentTermIndex,
    currentTermIndex,
    handleInsertFact,
    handleUpdateContentItem,
  } = props;

  const renderRow = ({ fact }, index) => {
    return (
      <div key={fact.id}>
        <EditorFact
          createTerm={createTerm}
          currentTermIndex={currentTermIndex}
          currentFactIndex={index}
          setCurrentTermIndex={setCurrentTermIndex}
          handleInsertFact={handleInsertFact}
          handleUpdateContentItem={handleUpdateContentItem}
        />
      </div>
    );
  };
  const handleOnDragEnd = () => {};
  return <div className={classes.facts}>{facts.map(renderRow)}</div>;
};
export default withStyles(styles)(CreateFacts);
