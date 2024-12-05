import { Api } from '@/api/clientApi';
import {
  CarouselOrderSummaryDto,
  WorkSchemaNodeManualDefinitionDto
} from '@/api/generated-types/generated-types';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { CarouselOrderSummaryTable } from '@/components/tables/edit-tables/CarouselOrderSummaryTable';
import { EmptyArray } from '@/api/literals';
import { IdWrapper } from '@/api/types';

export default async function Page() {
  const newVar = await Api.InitJsonTemplate.getOne(14);

  const { content } = newVar;
  const workSchemaNodeManualDefinitions = (
    JSON.parse(content) as WorkSchemaNodeManualDefinitionDto[]
  ).map(
    (dto) =>
      ({
        id: dto.name,
        data: dto
      }) as IdWrapper<WorkSchemaNodeManualDefinitionDto>
  );

  return (
    <>
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.workSchemaNodeManualDefinition}
        dtoList={workSchemaNodeManualDefinitions}
      />

      <CarouselOrderSummaryTable
        pathVariables={['data-entry', 'cycle-model']}
        depth={0}
      />
    </>
  );
}
