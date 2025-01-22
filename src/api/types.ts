// Spring Web Pagination interface
import { StringObjectRecord } from '@/api/string-object-record';
import { PartialDeep } from 'type-fest';
import {
  OrganizationDto,
  WorkProjectAssignmentDto
} from '@/api/generated-types/generated-types_';
import { Api } from '@/api/clientApi';
import { ClosureDto as ClosureDtoLibrary } from 'react-d3-force-wrapper';
import { Identifier } from 'dto-stores';

export type ClosureDto = ClosureDtoLibrary;

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

export type IdReferencedIntersectionTableDto<W> = StringObjectRecord<W[]>;

export interface HasNumberId {
  id: number;
}

export interface HasUuid {
  id: string;
}

export type HasId = {
  id: string | number;
};

export interface HasIdClass<T = Identifier> {
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

export interface GenericTableDto<
  Row extends object,
  Column extends object,
  CellContent,
  CellContentReference
> {
  columnList: Column[];
  rowList: Row[];
  rowColumnCellReferenceMap: {
    [key: string]: { [key: string]: CellContentReference };
  }; // Assuming CellReference is just a string identifier
  cellIdCellContentMap: { [key: string]: CellContent };
}

interface GenericRow<T> {
  id: string;
  data: T;
}

export interface OrganizationRow extends GenericRow<OrganizationDto> {
  entityClass: 'Organization';
}

export interface WorkProjectAssignmentRow
  extends GenericRow<WorkProjectAssignmentDto> {
  entityClass: 'WorkProjectAssignment';
}

export type AssignmentTableRow = OrganizationRow | WorkProjectAssignmentRow;

export type EntityApiKey = keyof typeof Api;
export type Comparator<T> = (a: T, b: T) => number;

export type JSONSerializable =
  | string
  | number
  | boolean
  | null
  | JSONSerializable[]
  | { [key: string]: JSONSerializable };

export type IdWrapper<T> = {
  data: T;
  id: string;
};
