import { WorkTaskTypeDto } from '@/api/generated-types/generated-types';
import React from 'react';
import { TypedPaths } from '@/api/custom-types/typePaths';
import { getValue } from '@/functions/allowingNestedFiltering';
import { Chip } from '@nextui-org/react';

export function renderWorkTaskTypeAttributeCell(
  workTaskTypeDto: WorkTaskTypeDto,
  columnKey: React.Key
) {
  const pathKey = columnKey as TypedPaths<
    WorkTaskTypeDto,
    string | number | undefined
  >;
  const cellValue = getValue(workTaskTypeDto, pathKey) ?? '';

  switch (pathKey) {
    case 'name':
      return (
        <span className={'inline-block w-24 truncate'}>
          {workTaskTypeDto.name}
        </span>
      );
    case 'knowledgeLevel.levelOrdinal':
      return <span className="inline-block w-12  text-sm">{cellValue}</span>;
    case 'knowledgeDomain.name':
      return <span className={'inline-block '}>{cellValue}</span>;
    default:
      return cellValue;
  }
}
