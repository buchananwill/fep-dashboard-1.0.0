import {
  DtoWrapper,
  InitDataTypeDto
} from '@/api/generated-types/generated-types';
import { JSONSerializable } from '@/api/types';

export type InitJsonTemplateDto = {
  id: number;
  name: string;
  content: JSONSerializable;
  dataType: InitDataTypeDto;
} & DtoWrapper<any, InitJsonTemplateDto, number>;
