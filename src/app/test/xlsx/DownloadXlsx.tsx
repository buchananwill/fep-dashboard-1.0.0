'use client';
import { ExportDataButton } from '@/components/export/ExportDataButton';

export function DownloadXlsx({ xlsx }: { xlsx: any }) {
  return (
    <ExportDataButton
      downloadProps={{
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        defaultName: 'spreadsheet.xlsx',
        getData: () => xlsx
      }}
    >
      Download
    </ExportDataButton>
  );
}
