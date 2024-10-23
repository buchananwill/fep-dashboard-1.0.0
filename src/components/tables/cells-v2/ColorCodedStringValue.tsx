import {
  EntityInnerCellProps,
  OptionallyHasColorDto
} from '@/components/tables/core-table-types';
import { HasIdClass } from '@/api/types';
import { ColumnUid } from '@/types';
import { Identifier } from 'dto-stores';
import { get } from 'lodash';
import { parseToCssRgba } from '@/components/tables/edit-v2/parseToCssRgba';
import { Chip } from '@mantine/core';

export function ColorCodedStringValue<
  T extends HasIdClass<T_ID> & OptionallyHasColorDto,
  K extends ColumnUid<T>,
  T_ID extends Identifier = T['id']
>({ entity, columnKey }: EntityInnerCellProps<T, T_ID, K>) {
  const value = get(entity, columnKey);

  const color = entity.color;

  const rgba = parseToCssRgba(color);

  return <Chip color={rgba}>{value}</Chip>;
}