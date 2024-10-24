import { PartialDeep } from 'type-fest';
import {
  DataFetchingEditDtoControllerArray,
  EditAddDeleteDtoControllerArray,
  MasterMapController
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import CarouselGroup from '@/components/carousel-groups/orders/components/CarouselGroup';
import { CarouselOptionState } from '@/components/carousel-groups/orders/components/option/CarouselOption';
import RotationConnectionOverlay from '@/components/carousel-groups/orders/components/RotationConnectionOverlay';
import { getCarouselGroups } from '@/components/carousel-groups/orders/getCarouselGroups';
import { EmptyArray } from '@/api/literals';
import { transformOptionForClientState } from '@/components/carousel-groups/orders/_functions/transformOptionForClientState';
import { getPathVariableSplitComponent } from '@/components/generic/PathVariableSplit';
import { KnowledgeLevelLinks } from '@/components/knowledge-levels/KnowledgeLevelLinks';
import { KnowledgeLevelSeriesLinks } from '@/components/knowledge-levels/KnowledgeLevelSeriesLinks';
import { getLastNVariables } from '@/functions/getLastNVariables';
import { Api } from '@/api/clientApi_';
import CarouselOrderModal from '@/components/carousel-groups/orders/order-modal/CarouselOrderModal';
import { notFound } from 'next/navigation';
import { CarouselOrderDto } from '@/api/generated-types/generated-types';
import { LeafComponentProps } from '@/app/core/navigation/data/types';
import RootCard from '@/components/generic/RootCard';
import { getRootCardLayoutId } from '@/components/work-task-types/getRootCardLayoutId';

async function CarouselGroupOrdersPage({ pathVariables }: LeafComponentProps) {
  const [id, levelOrdinal] = getLastNVariables(pathVariables, 2);
  const carouselGroupDtos = await getCarouselGroups(levelOrdinal, id);

  if (carouselGroupDtos.length === 0) notFound();

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
  const workProjectSeriesSchemaDtos =
    await Api.WorkProjectSeriesSchema.getDtoListByBodyList(schemaIdList);

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
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.workProjectSeriesSchema}
        dtoList={workProjectSeriesSchemaDtos}
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
      <RootCard layoutId={getRootCardLayoutId(pathVariables)}>
        <CarouselGroup
          entityClass={EntityClassMap.carouselGroup}
          entityId={carouselGroupDtos[0].id}
        />
      </RootCard>
    </>
  );
}

const CarouselGroupOrderLevelLinks = getPathVariableSplitComponent(
  KnowledgeLevelLinks,
  CarouselGroupOrdersPage
);
export const CarouselGroupOrdersHome = getPathVariableSplitComponent(
  KnowledgeLevelSeriesLinks,
  CarouselGroupOrderLevelLinks
);
