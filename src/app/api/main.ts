import { StringMap } from '@/app/api/string-map';

export const BASE_URL = process.env.BASE_URL!;
export const API_BASE_URL = process.env.API_BASE_URL!;
export const API_V2_URL = `${process.env.API_BASE_URL!}/v2`;
export const API_ACADEMIC_URL = process.env.API_ACADEMIC_URL!;

export const SECONDARY_EDUCATION_CATEGORY_ID = 2;
export const CLASSROOM_ROLE_TYPE_ID: number = 1;

// Spring Web Pagination interface
export interface Page<T> {
  content: T[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

export function isNotUndefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

export const EmptyArray: any[] = [];

export function joinSearchParams(searchParams: StringMap<string>): string {
  return Object.entries(searchParams).reduce(
    (joined, currentValue) => `${joined}&${currentValue[0]}=${currentValue[1]}`,
    ''
  );
}

export interface IntersectionPostRequestMap<T, U> {
  [key: string]: T[] | U[];
}

export interface IntersectionRequestParams<T, U> {
  idsForHasIdTypeT: T[];
  idsForHasIdTypeU: U[];
  url: string;
}

export interface IdReferencedIntersectionTableDto<W> extends StringMap<W[]> {}

export const ObjectPlaceholder = {} as const;

export interface HasNumberId {
  id: number;
}

export interface HasUuid {
  id: string;
}

export type HasId = HasNumberId | HasUuid;

export interface IntersectionGeneratorMatrix<T, U> {
  rowReferenceList: T[];
  columnReferenceList: U[];
  generatorMatrix: number[][];
}

export interface IntersectionGeneratorRow {
  [key: string]: number;
}

export interface IntersectionGeneratorRowWithHeader<T>
  extends IntersectionGeneratorRow {
  id: number;
}
