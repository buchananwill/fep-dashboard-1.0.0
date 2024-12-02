import { DownloadDataParams, useDownloadData } from '@/hooks/useDownloadData';
import { Button, ButtonProps } from '@mantine/core';
import { ComponentPropsWithoutRef } from 'react';

export function ExportDataButton({
  downloadProps,
  ...otherProps
}: ExportDataButtonProps) {
  const { ref, onClick } = useDownloadData(downloadProps);

  return (
    <>
      <a ref={ref} style={{ display: 'none' }} />
      <Button {...otherProps} onClick={onClick} />
    </>
  );
}

export type ExportDataButtonProps = {
  downloadProps: DownloadDataParams;
} & Omit<ButtonProps & ComponentPropsWithoutRef<'button'>, 'onClick'>;
