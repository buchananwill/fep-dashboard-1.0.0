import { StringObjectRecord } from '@/api/string-object-record';

export function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

export function isNotUndefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

export function isNotNullish<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null;
}
export function isNonZeroFalsy<T>(value: T | undefined | null): boolean {
  return value === undefined || value === null || isNaN(value as number);
}

export function joinSearchParams(
  searchParams: StringObjectRecord<string>
): string {
  return Object.entries(searchParams).reduce(
    (joined, currentValue) => `${joined}&${currentValue[0]}=${currentValue[1]}`,
    ''
  );
}
