'use client';
import { Pagination } from '@mantine/core';
import { useClientSidePaginationController } from '@/hooks/table-hooks/useClientSidePaginationController';

export default function DtoPagination() {
  const { pages, page, setPage } = useClientSidePaginationController();

  return (
    <Pagination total={Math.max(pages, 1)} onChange={setPage} value={page} />
  );
}
