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
      const mappedTerms = this.props.terms.map(
        ({
          node: {
            term: { id },
          },
        }) => id
      );
      const mappedPrevTerms = prevProps.terms.map(
        ({
          node: {
            term: { id },
          },
        }) => id
      );
      const newRows = mappedTerms.filter(
        (value) => mappedPrevTerms.indexOf(value) < 0
      );
      const newRowsIndex = newRows.map((value) => mappedTerms.indexOf(value));

      newRowsIndex.forEach((index) => {
        this.cache.clear(index - 1);
        this.listRef.recomputeRowHeights(index - 1);
        this.cache.clear(index);
        this.listRef.recomputeRowHeights(index);
      });
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
