import { Api } from '@/api/clientApi';
import {
  CycleInitWithCycleSubspanDefinitions,
  CycleSubspanDefinitionDto
} from '@/api/generated-types/generated-types_';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { IdWrapper } from '@/api/types';
import CycleSubspanDefinitionTable from '@/components/tables/edit-tables/CycleSubspanDefinitionTable';

export default async function Page() {
  const initJsonTemplate = await Api.InitJsonTemplate.getOne(10);
}
