import { Api } from '@/api/clientApi';
import { CarouselOrderSummaryDto } from '@/api/generated-types/generated-types';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { CarouselOrderSummaryTable } from '@/components/tables/edit-tables/CarouselOrderSummaryTable';

export default async function Page() {
  const newVar = await Api.InitJsonTemplate.getOne(17);
  const carouselGroupDtos = await Api.CarouselGroup.getAll();
  const { content } = newVar;
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
      <CarouselOrderSummaryTable
        pathVariables={['data-entry', 'cycle-model']}
        depth={0}
      />
    </>
  );
}
