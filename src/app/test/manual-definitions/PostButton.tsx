'use client';
import { Button } from '@mantine/core';
import { postManualDefinitions } from '@/app/test/manual-definitions/post-manual-definitions';
import { DataRow, rowCopies } from '@/app/test/manual-definitions/data';

export default function PostButton({ rowCopies }: { rowCopies: DataRow[] }) {
  return (
    <Button
      classNames={{ root: 'block' }}
      onClick={() => {
        postManualDefinitions(rowCopies);
      }}
    >
      POST
    </Button>
  );
}
