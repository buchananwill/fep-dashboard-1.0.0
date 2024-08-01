import { PartialDeep } from 'type-fest';
import { CarouselOrderDto } from '@/api/dtos/CarouselOrderDtoSchema';
import {
  DataFetchingEditDtoControllerArray,
  EditAddDeleteDtoControllerArray,
  MasterMapController
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import CarouselGroup from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselGroup';
import { CarouselOptionState } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOption';
import RotationConnectionOverlay from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/RotationConnectionOverlay';
import { getCarouselGroups } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/getCarouselGroups';
import { EmptyArray } from '@/api/literals';
import { transformOptionForClientState } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_functions/transformOptionForClientState';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { getPathVariableSplitComponent } from '@/app/service-categories/[id]/work-schema-nodes/PathVariableSplit';
import { ServiceCategoryLevelLinks } from '@/app/work-project-series-schemas/ServiceCategoryLevelLinks';
import { ServiceCategoryLinks } from '@/app/service-categories/[id]/knowledge-domains/ServiceCategoryLinks';
import { getLastNVariables } from '@/app/work-project-series-schemas/getLastNVariables';
import { Api } from '@/api/clientApi_';
import CarouselOrderModal from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/OrderModal/CarouselOrderModal';

async function CarouselGroupOrdersPage({ pathVariables }: LeafComponentProps) {
  const [id, levelOrdinal] = getLastNVariables(pathVariables, 2);
  const carouselGroupDtos = await getCarouselGroups(levelOrdinal, id);

  const exampleList: PartialDeep<CarouselOrderDto>[] = carouselGroupDtos.map(
    (group) => ({ carouselGroupId: group.id })
  );

  const schemaIdList = carouselGroupDtos.flatMap((dto) =>
    dto.carouselGroupOptions.map((option) => option.workProjectSeriesSchemaId)
  );
  const carouselIdList = carouselGroupDtos.flatMap((dto) =>
    dto.carousels.map((carousel) => carousel.id)
  );

  const carouselOrderList =
    await Api.CarouselOrder.getDtoListByExampleList(exampleList);
  const carouselDtoList =
    await Api.Carousel.getDtoListByBodyList(carouselIdList);
  const optionStateList = transformOptionForClientState(carouselDtoList);

  return (
    <>
      <RotationConnectionOverlay />
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
        getServerAction={Api.WorkProjectSeriesSchema.getDtoListByBodyList}
      />
      <DataFetchingEditDtoControllerArray
        idList={EmptyArray}
        entityClass={EntityClassMap.workTaskType}
        getServerAction={Api.WorkTaskType.getDtoListByBodyList}
      />
      <EditAddDeleteDtoControllerArray
        dtoList={carouselDtoList}
        entityClass={EntityClassMap.carousel}
      />
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.carouselOrder}
        dtoList={carouselOrderList}
        mergeInitialWithProp={true}
        updateServerAction={Api.CarouselOrder.putList}
      />
      <CarouselOrderModal />
      <CarouselGroup
        entityClass={EntityClassMap.carouselGroup}
        entityId={carouselGroupDtos[0].id}
      />
    </>
  );
}

const CarouselGroupOrderLevelLinks = getPathVariableSplitComponent(
  ServiceCategoryLevelLinks,
  CarouselGroupOrdersPage
);
export const CarouselGroupOrdersHome = getPathVariableSplitComponent(
  ServiceCategoryLinks,
  CarouselGroupOrderLevelLinks
);
