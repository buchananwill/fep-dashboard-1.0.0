import { Chip } from '@mantine/core';
import React from 'react';
import { getShortCodeColor } from '@/functions/getShortcodeColor';
import clsx from 'clsx';
import { InnerCellProps } from '@/components/tables/core-table-types';

export function StringValueChip({ value }: InnerCellProps<string>) {
  let shortCodeColor = getShortCodeColor(value);

  if (shortCodeColor === 'bg-white') shortCodeColor = 'bg-default-200';

  return <Chip className={clsx(shortCodeColor, ' select-none ')}>{value}</Chip>;
}
