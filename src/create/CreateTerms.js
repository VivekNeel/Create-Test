import React from "react";
import CreateFacts from "./CreateFacts";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  WindowScroller,
} from "react-virtualized";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

import clsx from "clsx";
import { withStyles, Card } from "@material-ui/core/";
import ContentItemRow from "./ContentItemRow";
const styles = () => ({
  card: {
    marginBottom: 24,
    borderRadius: 6,
    borderStyle: "solid",
    borderWidth: 2,
    "&$isDragging": {
      borderColor: "blue",
      borderWidth: 2,
      borderRadius: 6,
      borderStyle: "solid",
    },
  },
  isDragging: {},
  list: {
    outline: "none",
  },
});
const CreateTerms = (props) => {
  const { terms, classes, createTerm, inputIdToFocus, handleMoveCard } = props;

  const rowRenderer = ({ index, isScrolling, key, style }) => {
    const {
      node: {
        term,
        term: { id },
      },
    } = terms[index];
    return (
      <div style={style} key={id} index={index}>
        <ContentItemRow
          autoFocus={term.id === inputIdToFocus}
          createTerm={createTerm}
          term={term}
          moveCard={handleMoveCard}
          index={index}
        />
      </div>
    );
  };
  const getDynamiceRowHeight = ({ index }) => {
    return 300;
  };
  const handleOnDragEnd = () => {};
  return (
    <DndProvider backend={Backend}>
      <div tabIndex={-1} className={classes.container}>
        <WindowScroller>
          {({ height, scrollTop, onChildScroll }) => (
            <AutoSizer disableHeight>
              {({ width }) => (
                <List
                  ref={"list"}
                  autoHeight
                  height={height}
                  style={{ outline: "none" }}
                  overscanRowCount={3}
                  onScroll={onChildScroll}
                  scrollTop={scrollTop}
                  rowCount={terms.length}
                  rowHeight={getDynamiceRowHeight}
                  rowRenderer={rowRenderer}
                  width={width}
                />
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      </div>
    </DndProvider>
  );
};

export default withStyles(styles)(CreateTerms);
