import { ServiceCategoryRouteParams } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/serviceCategoryRouteParams';
import { getKnowledgeLevelPartial } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/_functions/getLevelPartialAndSchemaList';
import { getDtoListByExampleList as getKnowledgeLevelsByExampleList } from '@/api/generated-actions/KnowledgeLevel';
import { getDtoListByExampleList as getCarouselGroupsByExampleList } from '@/api/generated-actions/CarouselGroup';
import {
  getDtoListByExampleList,
  putList
} from '@/api/generated-actions/CarouselOrder';
import { PartialDeep } from 'type-fest';
import { CarouselOrderDto } from '@/api/dtos/CarouselOrderDtoSchema';
import {
  DataFetchingEditDtoControllerArray,
  EditAddDeleteDtoControllerArray,
  MasterMapController
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { getDtoListByBodyList } from '@/api/generated-actions/WorkProjectSeriesSchema';
import { getDtoListByBodyList as getCarouselByList } from '@/api/generated-actions/Carousel';
import { getDtoListByBodyList as getWorkTaskTypeByList } from '@/api/generated-actions/WorkTaskType';
import CarouselGroup from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselGroup';
import { EmptyArray } from '@/api/main';
import { CarouselOptionState } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOption';
import RotationConnectionOverlay from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/RotationConnectionOverlay';
import { CarouselOptionStateInterface } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_types';
import RotationConnectionOverlayV2 from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/RotationConnectionOverlayV2';

export default async function page({
  params: { levelOrdinal, id }
}: {
  params: ServiceCategoryRouteParams;
}) {
  const { levelPartial } = getKnowledgeLevelPartial(levelOrdinal, id);

  const kLevelList = await getKnowledgeLevelsByExampleList([levelPartial]);

  const [knowledgeLevel] = kLevelList;

  const carouselGroupDtos = await getCarouselGroupsByExampleList([
    { knowledgeLevel: knowledgeLevel }
  ]);

  const exampleList: PartialDeep<CarouselOrderDto>[] = carouselGroupDtos.map(
    (group) => ({ carouselGroupId: group.id })
  );

  const schemaIdList = carouselGroupDtos.flatMap((dto) =>
    dto.carouselGroupOptions.map((option) => option.workProjectSeriesSchemaId)
  );
  const carouselIdList = carouselGroupDtos.flatMap((dto) =>
    dto.carousels.map((carousel) => carousel.id)
  );

  const carouselDtoList = await getCarouselByList(carouselIdList);

  const carouselOrderList = await getDtoListByExampleList(exampleList);

  const optionStateList: CarouselOptionStateInterface[] =
    carouselDtoList.flatMap((carousel) => {
      return carousel.carouselOptionDtos.map((dto) => ({
        ...dto,
        carouselOrderAssignees: [],
        clashMap: new Map()
      }));
    });

  console.log(carouselOrderList);

  return (
    <>
      <RotationConnectionOverlayV2 />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.carouselGroup}
        dtoList={carouselGroupDtos}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={CarouselOptionState}
        dtoList={optionStateList}
      />
      <MasterMapController entityClass={CarouselOptionState} />
      <DataFetchingEditDtoControllerArray
        idList={schemaIdList}
        entityClass={EntityClassMap.workProjectSeriesSchema}
        getServerAction={getDtoListByBodyList}
      />
      <DataFetchingEditDtoControllerArray
        idList={EmptyArray}
        entityClass={EntityClassMap.workTaskType}
        getServerAction={getWorkTaskTypeByList}
      />
      <EditAddDeleteDtoControllerArray
        dtoList={carouselDtoList.sort(
          (carouselA, carouselB) =>
            carouselA.carouselOrdinal - carouselB.carouselOrdinal
        )}
        entityClass={EntityClassMap.carousel}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.carouselOrder}
        dtoList={carouselOrderList}
        updateServerAction={putList}
      />
      <CarouselGroup
        entityClass={EntityClassMap.carouselGroup}
        entityId={carouselGroupDtos[0].id}
      />
    </>
  );
}
