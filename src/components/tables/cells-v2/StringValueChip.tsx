import { Chip } from '@mantine/core';
import React from 'react';
import { getShortCodeColor } from '@/functions/getShortcodeColor';
import clsx from 'clsx';
import { IdInnerCellProps } from '@/components/tables/core-table-types';

export function StringValueChip({ value }: IdInnerCellProps<string>) {
  let shortCodeColor = getShortCodeColor(value);

  if (shortCodeColor === 'bg-white') shortCodeColor = 'bg-default-200';

  return <Chip className={clsx(shortCodeColor, ' select-none ')}>{value}</Chip>;
}
