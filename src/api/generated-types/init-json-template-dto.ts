import {
  DtoWrapper,
  InitDataTypeDto
} from '@/api/generated-types/generated-types_';
import { JSONSerializable } from '@/api/types';

export type InitJsonTemplateDto = {
  id: number;
  name: string;
  content: JSONSerializable;
  dataType: InitDataTypeDto;
} & DtoWrapper<any, InitJsonTemplateDto, number>;
