import { StringObjectRecord } from '@/api/string-object-record';

export function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

export function isNotUndefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

export function joinSearchParams(
  searchParams: StringObjectRecord<string>
): string {
  return Object.entries(searchParams).reduce(
    (joined, currentValue) => `${joined}&${currentValue[0]}=${currentValue[1]}`,
    ''
  );
}
