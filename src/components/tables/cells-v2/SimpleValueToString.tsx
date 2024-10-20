import { InnerCellProps } from '@/components/tables/core-table-types';

export function SimpleValueToString({ value }: InnerCellProps<string>) {
  return value ?? 'MISSING';
}

export function SimpleValueToStringOrUndefined({
  value
}: InnerCellProps<string | undefined>) {
  return value ?? '';
}
