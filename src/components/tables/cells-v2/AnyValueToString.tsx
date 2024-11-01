import { IdInnerCellProps } from '@/components/tables/core-table-types';
import { isNotUndefined } from '@/api/main';

export function AnyValueToString({ value }: IdInnerCellProps<any>) {
  return isNotUndefined(value) ? String(value) : 'NULL';
}

export function SimpleValueToStringOrUndefined({
  value
}: IdInnerCellProps<string | undefined>) {
  return value ?? '';
}
