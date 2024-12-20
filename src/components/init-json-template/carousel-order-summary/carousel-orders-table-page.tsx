import { Api } from '@/api/clientApi';
import { CarouselOrderSummaryDto } from '@/api/generated-types/generated-types_';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { EmptyArray } from '@/api/literals';
import { CarouselOrderSummaryTable } from '@/components/tables/edit-tables/CarouselOrderSummaryTable';
import { InitJsonTemplatePageProps } from '@/components/init-json-template/dataTypes';

export async function CarouselOrdersTablePage({
  initJsonTemplate
}: InitJsonTemplatePageProps) {
  const carouselGroupDtos = await Api.CarouselGroup.getAll();
  const { content } = initJsonTemplate;
  const carouselOrderSummaryDtos: CarouselOrderSummaryDto[] =
    JSON.parse(content);

  return (
    <>
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.carouselOrderSummary}
        dtoList={carouselOrderSummaryDtos}
      />
      <EditAddDeleteDtoControllerArray
        dtoList={carouselGroupDtos}
        entityClass={EntityClassMap.carouselGroup}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={'IdWrapper'}
        dtoList={EmptyArray}
      />
      <CarouselOrderSummaryTable
        pathVariables={['data-entry', 'cycle-model']}
        depth={0}
      />
    </>
  );
}
