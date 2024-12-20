import { Api } from '@/api/clientApi';
import { WorkSchemaNodeManualDefinitionDto } from '@/api/generated-types/generated-types_';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { IdWrapper } from '@/api/types';
import { WorkSchemaNodeManualDefinitionTable } from '@/components/tables/edit-tables/WorkSchemaNodeManualDefinitionTable';

export default async function Page() {
  const newVar = await Api.InitJsonTemplate.getOne(14);
}
