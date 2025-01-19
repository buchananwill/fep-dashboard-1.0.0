'use client';
import { ExportDataButton } from '@/components/export/ExportDataButton';

export const ClientComponent = ({ userGuide }: { userGuide: string }) => {
  return (
    <ExportDataButton
      downloadProps={{
        type: 'application/json',
        defaultName: 'user-guide.json',
        getData: () => userGuide
      }}
    >
      Click Me
    </ExportDataButton>
  );
};
