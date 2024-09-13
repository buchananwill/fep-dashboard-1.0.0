import { NextUiCellComponentProps } from '@/app/work-project-series-schemas/_components/GetCellRenderFunction';
import {
  WorkProjectSeriesSchemaDto,
  WorkTaskTypeDto
} from '@/api/generated-types/generated-types';
import { Chip } from '@nextui-org/chip';
import { getValue } from '@/functions/allowingNestedFiltering';
import React from 'react';
import { HasId } from '@/api/types';
import { TypedPaths } from '@/functions/typePaths';
import { get } from 'lodash';
import { getShortCodeColor } from '@/components/feasibility-report/getShortcodeColor';
import clsx from 'clsx';

export function StringValueChip<
  T extends HasId & { workTaskType: WorkTaskTypeDto }
>(props: NextUiCellComponentProps<T>) {
  const stringValue = get(
    props.entity,
    props.path as TypedPaths<T, string | number>,
    ''
  );

  let shortCodeColor = getShortCodeColor(stringValue);

  if (shortCodeColor === 'bg-white') shortCodeColor = 'bg-default-200';

  return (
    <Chip className={clsx(shortCodeColor, 'select-none')}>{stringValue}</Chip>
  );
}
