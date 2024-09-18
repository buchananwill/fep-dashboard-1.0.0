import { NextUiCellComponentProps } from '@/components/tables/GetCellRenderFunction';
import { WorkTaskTypeDto } from '@/api/generated-types/generated-types';
import { Chip } from '@nextui-org/chip';
import React from 'react';
import { HasId } from '@/api/types';
import { TypedPaths } from '@/api/custom-types/typePaths';
import { get } from 'lodash';
import { getShortCodeColor } from '@/functions/getShortcodeColor';
import clsx from 'clsx';

export function StringValueChip<T extends HasId>(
  props: NextUiCellComponentProps<T>
) {
  const stringValue = get(
    props.entity,
    props.path as TypedPaths<T, string | number>,
    ''
  );

  let shortCodeColor = getShortCodeColor(stringValue);

  if (shortCodeColor === 'bg-white') shortCodeColor = 'bg-default-200';

  return (
    <Chip className={clsx(shortCodeColor, ' select-none ')}>{stringValue}</Chip>
  );
}
