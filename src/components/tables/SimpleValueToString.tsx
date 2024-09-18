import { HasId } from '@/api/types';
import { NextUiCellComponentProps } from '@/components/tables/GetCellRenderFunction';
import { get } from 'lodash';

export function SimpleValueToString<T extends HasId>({
  entity,
  path
}: NextUiCellComponentProps<T>) {
  const value = get(entity, path);

  return String(value);
}
