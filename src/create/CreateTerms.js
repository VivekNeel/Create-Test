import React from "react";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  WindowScroller,
} from "react-virtualized";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

import ContentItemRow from "./ContentItemRow";

class CreateTerms extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentTermIndex: -1,
      index: {
        startIndex: -1,
        stopIndex: -1,
      },
    };
    this.cache = new CellMeasurerCache({
      fixedWidth: true,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.terms !== prevProps.terms) {
      const index = this.state.currentTermIndex;
      if (index > 0) {
        this.cache.clear(index - 1);
        this.listRef.recomputeRowHeights(index - 1);
      }
      this.cache.clear(index);
      this.listRef.recomputeRowHeights(index);
      this.cache.clear(index + 1);
      this.listRef.recomputeRowHeights(index + 1);
    }
    if (this.props.terms.length !== prevProps.terms.length) {
      const index = this.state.currentTermIndex;
      if (index > 0) {
        this.cache.clear(index - 1);
        this.listRef.recomputeRowHeights(index - 1);
      }
      this.cache.clear(index);
      this.listRef.recomputeRowHeights(index);
      this.cache.clear(index + 1);
      this.listRef.recomputeRowHeights(index + 1);
    }
  }

  handleSetCurrentTermIndex = (index) => {
    if (index !== this.state.currentTermIndex)
      this.setState({
        currentTermIndex: index,
      });
  };

  rowRenderer = ({ index, isScrolling, key, style, parent }) => {
    const {
      createTerm,
      inputIdToFocus,
      handleMoveCard,
      handleInsertFact,
      terms,
    } = this.props;

    const {
      node: {
        term,
        term: { id },
      },
    } = terms[index];

    return (
      <CellMeasurer
        key={id}
        parent={parent}
        cache={this.cache}
        rowIndex={index}
        columnIndex={0}
      >
        {({ measure }) => {
          return (
            <div style={style}>
              <ContentItemRow
                autoFocus={term.id === inputIdToFocus}
                createTerm={createTerm}
                term={term}
                moveCard={handleMoveCard}
                handleInsertFact={handleInsertFact}
                index={index}
                handleSetCurrentTermIndex={this.handleSetCurrentTermIndex}
              />
            </div>
          );
        }}
      </CellMeasurer>
    );
  };
  handleOnDragEnd = () => {};

  getRowHeight = ({ index }) => {
    return this.cache.rowHeight({ index }) + 20;
  };

  // handleOnRowsRendered = ({ startIndex, stopIndex }) => {
  //   this.setState({
  //     index: {
  //       startIndex,
  //       stopIndex,
  //     },
  //   });
  // };
  render = () => {
    const { terms } = this.props;

    return (
      <WindowScroller>
        {({ height, scrollTop, onChildScroll }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <DndProvider backend={Backend}>
                <List
                  ref={(ref) => (this.listRef = ref)}
                  autoHeight
                  height={height}
                  style={{ outline: "none" }}
                  overscanRowCount={3}
                  onScroll={onChildScroll}
                  scrollTop={scrollTop}
                  rowCount={terms.length}
                  rowHeight={this.getRowHeight}
                  rowRenderer={this.rowRenderer}
                  deferredMeasurementCache={this.cache}
                  width={width}
                />
              </DndProvider>
            )}
          </AutoSizer>
        )}
      </WindowScroller>
    );
  };
}

export default CreateTerms;
