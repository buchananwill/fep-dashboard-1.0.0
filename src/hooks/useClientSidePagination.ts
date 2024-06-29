import React, { useCallback, useState } from 'react';

export function useClientSidePagination(initialRowsPerPage: any) {
  // Set up pagination
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [page, setPage] = useState(1);
  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );
  return { rowsPerPage, page, setPage, onRowsPerPageChange };
}