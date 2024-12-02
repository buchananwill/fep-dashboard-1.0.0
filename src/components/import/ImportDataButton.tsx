import { Button, FileButton, FileButtonProps } from '@mantine/core';
import { ComponentPropsWithoutRef } from 'react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';

export function ImportDataButton(props: ImportDataButtonProps) {
  return (
    <FileButton {...props}>
      {(props) => (
        <Button rightSection={<ArrowUpTrayIcon className={'w-6'} />} {...props}>
          Import
        </Button>
      )}
    </FileButton>
  );
}

export type ImportDataButtonProps = {} & Omit<FileButtonProps, 'children'> &
  Omit<ComponentPropsWithoutRef<'button'>, 'onClick' | 'onChange'>;
