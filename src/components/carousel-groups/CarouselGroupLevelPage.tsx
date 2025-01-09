import { getDtoListByExampleList as getKnowledgeLevelsByExampleList } from '@/api/generated-actions/KnowledgeLevel';
import { EntityClassMap } from '@/api/entity-class-map';
import CarouselGroupTabGroup from '@/components/carousel-groups/_components/CarouselGroupTabGroup';
import { getLevelPartialAndSchemaList } from '@/components/work-project-series-schema/_functions/getLevelPartialAndSchemaList';
import {
  deleteIdList,
  getDtoListByExampleList as getCarouselGroupsByExampleList,
  postList,
  putList
} from '@/api/generated-actions/CarouselGroup';
import { getPathVariableSplitComponent } from '@/components/generic/PathVariableSplit';
import { KnowledgeLevelLinks } from '@/components/knowledge-levels/KnowledgeLevelLinks';
import { KnowledgeLevelSeriesLinks } from '@/components/knowledge-levels/KnowledgeLevelSeriesLinks';
import { getLastNVariables } from '@/functions/getLastNVariables';
import RootCard from '@/components/generic/RootCard';
import { getRootCardLayoutId } from '@/components/work-types/getRootCardLayoutId';
import { LeafComponentProps } from '@/app/core/navigation/data/types';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { Api } from '@/api/clientApi';

export default async function CarouselGroupLevelPage({
  depth,
  pathVariables
}: LeafComponentProps) {
  const [serviceCategoryId, levelOrdinal] = getLastNVariables(pathVariables, 2);
  const { levelPartial, workProjectSeriesSchemaList: data } =
    await getLevelPartialAndSchemaList(levelOrdinal, serviceCategoryId);

  const kLevelList = await getKnowledgeLevelsByExampleList([levelPartial]);

  const [knowledgeLevel] = kLevelList;

  const carouselGroupDtos = await getCarouselGroupsByExampleList([
    { knowledgeLevel: knowledgeLevel }
  ]);

  return (
    <div className={'p-4'}>
      <RootCard layoutId={getRootCardLayoutId(pathVariables)}>
        <EditAddDeleteDtoControllerArray
          entityClass={EntityClassMap.carouselGroup}
          dtoList={carouselGroupDtos}
          updateServerAction={Api.CarouselGroup.putList}
          deleteServerAction={Api.CarouselGroup.deleteIdList}
          postServerAction={Api.CarouselGroup.postList}
        />
        <EditAddDeleteDtoControllerArray
          entityClass={EntityClassMap.workProjectSeriesSchema}
          dtoList={data}
          key={`${EntityClassMap.workProjectSeriesSchema}:${levelOrdinal}`}
        />
        <CarouselGroupTabGroup
          knowledgeLevel={knowledgeLevel}
          collectionEntityClass={EntityClassMap.carouselGroup}
          referencedEntityClass={EntityClassMap.workProjectSeriesSchema}
        />
      </RootCard>
    </div>
  );
}

export const CarouselGroupLevelLinks = getPathVariableSplitComponent(
  KnowledgeLevelLinks,
  CarouselGroupLevelPage
);

export const CarouselGroupHome = getPathVariableSplitComponent(
  KnowledgeLevelSeriesLinks,
  CarouselGroupLevelLinks
);

export function CarouselGroupsAndOrders(props: LeafComponentProps) {
  const { depth, pathVariables } = props;
  const showBothCards = depth === pathVariables.length;
  return (
    <div className={'flex gap-2'}>
      <CarouselGroupHome {...props} />
    </div>
  );
}
