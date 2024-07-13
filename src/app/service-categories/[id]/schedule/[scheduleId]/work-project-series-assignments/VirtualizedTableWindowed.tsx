import React, {
  ReactElement,
  ReactNode,
  useCallback,
  useRef,
  useState
} from 'react';
import {
  FixedSizeGrid,
  GridChildComponentProps,
  GridOnScrollProps
} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

const DefaultScrollBarSize = 20;
const defaultSyncColumnWidth = 100;
const defaultCellSize = 40;

export interface VirtualizedTableProps<T> {
  rowIdList: number[];
  columnIdList: number[];
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

  const syncedRow = useRef<FixedSizeGrid | null>(null);
  const syncedColumn = useRef<FixedSizeGrid | null>(null);

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

  const rowCount = rowIdList.length ?? 0;
  const columnCount = columnIdList.length ?? 0;

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
                  width={width - (defaultSyncColumnWidth + scrollBarWidth)}
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
                  height={height - (defaultCellSize + scrollBarWidth)}
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
                    overscanRowCount={4}
                    overscanColumnCount={4}
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
