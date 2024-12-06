import { getCellRenderFunction } from '@/components/tables/cells-v2/generic/GetCellRenderFunction';
import {
  CellComponentRecord,
  EntityInnerCellProps
} from '@/components/tables/core-table-types';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types';
import { get } from 'lodash';
import { Button } from '@mantine/core';
import { useClickToFilter } from '@/hooks/useClickToFilter';
import { useEntityTableContext } from '@/hooks/table-hooks/table-context';
import { parseToCssRgba } from '@/functions/parseToCssRgba';
import { ColumnUid } from '@/types';

const cellRecord: CellComponentRecord<KnowledgeDomainDto> = {
  name: { type: 'EntityInnerCell', component: KnowledgeDomainReadOnlyCell },
  shortCode: { type: 'EntityInnerCell', component: KnowledgeDomainReadOnlyCell }
};

export const KnowledgeDomainReadOnlyCellModel = getCellRenderFunction(
  'knowledgeDomain',
  cellRecord
);

function KnowledgeDomainReadOnlyCell({
  entity,
  columnKey
}: EntityInnerCellProps<KnowledgeDomainDto>) {
  const { entityClass } = useEntityTableContext();
  const { color } = entity;
  let value = get(entity, columnKey);

  const clickToFilter = useClickToFilter(entityClass, columnKey, String(value));

  if (listOfColorPaths.includes(columnKey)) {
    return null;
  } else {
    value = String(value);
  }

  const colorString = parseToCssRgba(color);

  return (
    <Button
      onClick={clickToFilter}
      fullWidth
      radius={'xs'}
      justify={'start'}
      color={colorString}
      autoContrast
      variant={'subtle'}
    >
      {value}
    </Button>
  );
}

const listOfColorPaths: ColumnUid<KnowledgeDomainDto>[] = [
  'color',
  'color.a',
  'color.b',
  'color.r',
  'color.g'
] as const;
