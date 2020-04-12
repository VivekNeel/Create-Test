import React, { useRef } from "react";
import ContentEditor from "./ContentEditor";
import { useDrag, useDrop } from "react-dnd";

const EditorFact = (props) => {
  const {
    createTerm,
    handleInsertFact,
    currentTermIndex,
    setCurrentTermIndex,
    handleUpdateContentItem,
    currentFactIndex,
  } = props;
  const ref = useRef(null);
  //   const [, drop] = useDrop({
  //     accept: "EditorFact",
  //     hover(item, monitor) {
  //       if (!ref.current) {
  //         return;
  //       }
  //       const dragIndex = item.index;
  //       const hoverIndex = index;
  //       // Don't replace items with themselves
  //       if (dragIndex === hoverIndex) {
  //         console.log("....true", hoverIndex, dragIndex);
  //         return;
  //       }
  //       // Determine rectangle on screen
  //       const hoverBoundingRect = ref.current.getBoundingClientRect();
  //       // Get vertical middle
  //       const hoverMiddleY =
  //         (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  //       // Determine mouse position
  //       const clientOffset = monitor.getClientOffset();
  //       // Get pixels to the top
  //       const hoverClientY = clientOffset.y - hoverBoundingRect.top;
  //       // Only perform the move when the mouse has crossed half of the items height
  //       // When dragging downwards, only move when the cursor is below 50%
  //       // When dragging upwards, only move when the cursor is above 50%
  //       // Dragging downwards
  //       if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
  //         return;
  //       }
  //       // Dragging upwards
  //       if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
  //         return;
  //       }
  //       // Time to actually perform the action
  //       // moveCard(dragIndex, hoverIndex);
  //       // Note: we're mutating the monitor item here!
  //       // Generally it's better to avoid mutations,
  //       // but it's good here for the sake of performance
  //       // to avoid expensive index searches.
  //       item.index = hoverIndex;
  //     },
  //   });
  //   const [{ isDragging }, drag] = useDrag({
  //     item: { type: "EditorFact", id, index },
  //     collect: (monitor) => ({
  //       isDragging: monitor.isDragging(),
  //     }),
  //   });
  const opacity = false ? 0 : 1;
  //   drag(drop(ref));
  return (
    <div ref={ref} style={{ opacity, cursor: "grab", paddingBottom: 16 }}>
      <ContentEditor
        createTerm={createTerm}
        currentTermIndex={currentTermIndex}
        handleInsertFact={handleInsertFact}
        setCurrentTermIndex={setCurrentTermIndex}
        placeholder={"New fact"}
        handleUpdateContentItem={handleUpdateContentItem}
        contentItemType={"Fact"}
        currentFactIndex={currentFactIndex}
      />
    </div>
  );
};

export default EditorFact;
