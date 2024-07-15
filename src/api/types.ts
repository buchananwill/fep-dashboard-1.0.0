// Spring Web Pagination interface
import { StringObjectRecord } from '@/api/string-object-record';
import { PartialDeep } from 'type-fest';
import { ProviderRolePostRequest } from '@/api/dtos/ProviderRolePostRequestSchema_';

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

export interface IntersectionPostRequestMap<T, U> {
  [key: string]: T[] | U[];
}

export interface IntersectionRequestParams<T, U> {
  idsForHasIdTypeT: T[];
  idsForHasIdTypeU: U[];
  url: string;
}

export interface IdReferencedIntersectionTableDto<W>
  extends StringObjectRecord<W[]> {}

export interface HasNumberId {
  id: number;
}

export interface HasUuid {
  id: string;
}

export type HasId = HasNumberId | HasUuid;

export interface HasIdClass<T> {
  id: T;
}

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

export interface ChordMapWithMetaData<T> {
  metaData: T;
  chordMapData: number[][];
}

export interface NivoChordMetaData {
  keys: string[];
  entityIds: string[];
}

export interface RepeatPostRequest<T> {
  postRequest: T;
  count: number;
}

export interface BulkRepeatPostRequest<T> {
  repeatPostRequestMap: Record<string, RepeatPostRequest<T>>;
}

export type TemplateRequestOverrides<T> = PartialDeep<RepeatPostRequest<T>>;
