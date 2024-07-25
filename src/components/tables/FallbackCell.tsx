import { GridChildComponentProps } from 'react-window';
import React from 'react';

export default function FallbackCell({
  rowIndex,
  columnIndex,
  style
}: GridChildComponentProps) {
  return (
    <div style={style}>
      {rowIndex},{columnIndex}
    </div>
  );
}

export const FallbackCellMemo = React.memo(FallbackCell);
