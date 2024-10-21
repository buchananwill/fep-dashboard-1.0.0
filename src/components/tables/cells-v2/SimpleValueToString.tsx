import { IdInnerCellProps } from '@/components/tables/core-table-types';

export function SimpleValueToString({ value }: IdInnerCellProps<string>) {
  return value ?? 'MISSING';
}

export function SimpleValueToStringOrUndefined({
  value
}: IdInnerCellProps<string | undefined>) {
  return value ?? '';
}
