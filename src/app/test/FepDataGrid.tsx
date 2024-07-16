'use client';

import 'react-data-grid/lib/styles.css';
import { useState } from 'react';
import { faker } from '@faker-js/faker';

import DataGrid, {
  SelectColumn,
  textEditor,
  Column,
  CopyEvent,
  FillEvent,
  PasteEvent,
  DataGridProps
} from 'react-data-grid';

export default function FepDataGrid({
  direction = 'ltr',
  columns,
  rows
}: DataGridProps<any>) {
  const [selectedRows, setSelectedRows] = useState(
    (): ReadonlySet<string> => new Set()
  );

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      rowHeight={40}
      selectedRows={selectedRows}
      onSelectedRowsChange={setSelectedRows}
      className="fill-grid"
      direction={direction}
      onCellClick={(args, event) => {
        if (args.column.key === 'title') {
          event.preventGridDefault();
          args.selectCell(true);
        }
      }}
    />
  );
}
