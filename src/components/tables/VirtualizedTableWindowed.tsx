import React, {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import {
  FixedSizeGrid,
  GridChildComponentProps,
  GridOnScrollProps
} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Identifier } from 'dto-stores';

export const DefaultScrollBarSize = 20;
export const defaultSyncColumnWidth = 100;
export const defaultCellSize = 40;

export interface VirtualizedTableProps<T> {
  rowIdList: Identifier[];
  columnIdList: Identifier[];
  itemData: T;
  renderCell: (props: GridChildComponentProps<T>) => ReactNode;
  renderSyncedRowCell: (props: GridChildComponentProps<T>) => ReactNode;
  renderSyncedColumnCell: (props: GridChildComponentProps<T>) => ReactNode;
}

export default function VirtualizedTableWindowed<T>({
  rowIdList,
  columnIdList,
  renderCell,
  renderSyncedColumnCell,
  renderSyncedRowCell,
  itemData
}: VirtualizedTableProps<T>) {
  const [scrollBarWidth, setScrollBarWidth] = useState(DefaultScrollBarSize);
  const [scrollBarStatus, setScrollBarStatus] = useState({
    vertical: false,
    horizontal: false
  });
  const firstRenderRef = useRef(true);

  const syncedRow = useRef<FixedSizeGrid | null>(null);
  const syncedColumn = useRef<FixedSizeGrid | null>(null);
  const mainContainer = useRef<HTMLDivElement | null>(null);

  const onScroll = useCallback(
    ({
      scrollTop,
      scrollUpdateWasRequested,
      scrollLeft
    }: GridOnScrollProps) => {
      if (!scrollUpdateWasRequested) {
        if (syncedColumn.current && syncedRow.current) {
          syncedColumn.current.scrollTo({ scrollLeft: 0, scrollTop });
          syncedRow.current.scrollTo({ scrollLeft, scrollTop: 0 });
        }
      }
    },
    []
  );

  const onResize = useCallback(() => {
    setScrollBarWidth(getScrollbarWidth());
  }, []);

  useEffect(() => {
    if (firstRenderRef.current && mainContainer.current) {
      onResize();
      firstRenderRef.current = false;
    }
  }, [onResize]);
  const rowCount = rowIdList.length ?? 0;
  const columnCount = columnIdList.length ?? 0;

  useEffect(() => {
    if (mainContainer.current) {
      const { scrollHeight, clientHeight, scrollWidth, clientWidth } =
        mainContainer.current;
      const hasVerticalScrollBar = scrollHeight > clientHeight;
      const hasHorizontalScrollBar = scrollWidth > clientWidth;
      setScrollBarStatus((status) => {
        if (
          status.vertical !== hasVerticalScrollBar ||
          status.horizontal !== hasHorizontalScrollBar
        ) {
          return {
            vertical: hasVerticalScrollBar,
            horizontal: hasHorizontalScrollBar
          };
        } else return status;
      });
    }
  }, [rowCount, columnCount, scrollBarWidth]);

  return (
    <AutoSizer onResize={onResize}>
      {({ height, width }) => {
        return (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateAreas: `'. stickyRow' 'stickyCol main'`,
                gridTemplateRows: '40px 1fr',
                gridTemplateColumns: '100px 1fr',
                gap: '4px'
              }}
            >
              <div
                style={{ gridArea: 'stickyRow' }}
                className={'overflow-hidden rounded-md border-2 bg-default-100'}
              >
                <FixedSizeGrid
                  style={{ overflowX: 'hidden' }}
                  ref={syncedRow}
                  columnWidth={defaultCellSize}
                  rowHeight={defaultCellSize}
                  columnCount={columnCount}
                  height={defaultCellSize}
                  rowCount={1}
                  itemData={itemData}
                  width={
                    width -
                    (defaultSyncColumnWidth +
                      (scrollBarStatus.vertical ? scrollBarWidth : 0))
                  }
                >
                  {renderSyncedRowCell}
                </FixedSizeGrid>
              </div>

              <div
                style={{ gridArea: 'stickyCol' }}
                className={'overflow-hidden rounded-md border-2 bg-default-100'}
              >
                <FixedSizeGrid
                  style={{ overflowY: 'hidden' }}
                  ref={syncedColumn}
                  columnWidth={defaultSyncColumnWidth}
                  rowHeight={defaultCellSize}
                  columnCount={1}
                  height={
                    height -
                    (defaultCellSize +
                      (scrollBarStatus.horizontal ? scrollBarWidth : 0))
                  }
                  rowCount={rowCount}
                  itemData={itemData}
                  width={defaultSyncColumnWidth}
                >
                  {renderSyncedColumnCell}
                </FixedSizeGrid>
              </div>
              <div
                style={{ gridArea: 'main' }}
                className={'overflow-clip rounded-md border-2'}
              >
                <div className={'h-fit w-fit'}>
                  <FixedSizeGrid
                    onScroll={onScroll}
                    outerRef={mainContainer}
                    overscanRowCount={6}
                    overscanColumnCount={3}
                    columnWidth={defaultCellSize}
                    rowHeight={defaultCellSize}
                    columnCount={columnCount}
                    height={height - defaultCellSize}
                    rowCount={rowCount}
                    itemData={itemData}
                    width={width - defaultSyncColumnWidth}
                  >
                    {renderCell}
                  </FixedSizeGrid>
                </div>
              </div>
            </div>
          </>
        );
      }}
    </AutoSizer>
  );
}

function getScrollbarWidth() {
  // Create a temporary div container and append it into the body
  const container = document.createElement('div');
  // Force scrollbar on the container
  container.style.visibility = 'hidden';
  container.style.overflow = 'scroll';

  // Add an inner div container
  const inner = document.createElement('div');
  container.appendChild(inner);

  // Append the container to the body
  document.body.appendChild(container);

  // Calculate the width based on the difference between the container's full width and the child inner element width
  const scrollbarWidth = container.offsetWidth - inner.offsetWidth;

  // Remove the temporary elements from the DOM
  document.body.removeChild(container);

  return scrollbarWidth;
}
