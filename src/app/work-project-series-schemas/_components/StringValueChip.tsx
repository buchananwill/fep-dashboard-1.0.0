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

export function StringValueChip<
  T extends HasId & { workTaskType: WorkTaskTypeDto }
>(props: NextUiCellComponentProps<T>) {
  return (
    <Chip>
      {get(props.entity, props.path as TypedPaths<T, string | number>, '')}
    </Chip>
  );
}
