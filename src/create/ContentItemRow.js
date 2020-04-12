import React, { useRef } from "react";
import CreateFacts from "./CreateFacts";
import { useDrag, useDrop } from "react-dnd";
import clsx from "clsx";
import { withStyles, Card } from "@material-ui/core/";
import ContentEditor from "./ContentEditor";
const styles = () => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  card: {
    borderRadius: 6,
    padding: 16,
    borderStyle: "solid",
    borderWidth: 2,
    cursor: "grab",
    borderColor: "lightgray",
    "&$isDragging": {
      borderColor: "blue",
      borderWidth: 2,
      borderRadius: 6,
      borderStyle: "solid",
    },
  },
  isDragging: {},
  term: {
    marginRight: 16,
    flex: 1,
  },
  facts: {
    flex: 1,
  },
});

const ContentItemRow = (props) => {
  const {
    term,
    classes,
    createTerm,
    autoFocus,
    moveCard,
    handleInsertFact,
    handleSetCurrentTermIndex,
  } = props;
  const ref = useRef(null);
  const { id, ord } = term;
  const index = ord;

  const [, drop] = useDrop({
    accept: "ContentItemRow",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    item: { type: "ContentItemRow", id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <Card
      ref={ref}
      className={clsx(classes.card, isDragging && classes.isDragging)}
    >
      <p>{index}</p>
      <div className={classes.container}>
        <div className={classes.term}>
          <ContentEditor
            autoFocus={autoFocus}
            createTerm={createTerm}
            placeholder={"New term"}
            currentTermIndex={index}
            setCurrentTermIndex={handleSetCurrentTermIndex}
          />
        </div>
        <CreateFacts
          facts={term.facts}
          termId={term.id}
          currentTermIndex={index}
          createTerm={createTerm}
          currentTermIndex={index}
          setCurrentTermIndex={handleSetCurrentTermIndex}
          handleInsertFact={handleInsertFact}
        />
      </div>
    </Card>
  );
};

export default withStyles(styles)(
  React.memo(ContentItemRow, (p, n) => {
    console.log(".....p");
    return p.term === n.term;
  })
);
