import {
  DtoWrapper,
  InitDataTypeDto,
  Serializable
} from '@/api/generated-types/generated-types';
import { JSONSerializable } from '@/api/types';

export interface InitJsonTemplateDto
  extends Serializable,
    DtoWrapper<any, InitJsonTemplateDto, number> {
  id: number;
  name: string;
  content: JSONSerializable;
  dataType: InitDataTypeDto;
}
