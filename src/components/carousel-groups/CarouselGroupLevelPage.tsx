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
import { LeafComponentProps } from '@/app/core/navigation/types';
import { getPathVariableSplitComponent } from '@/components/generic/PathVariableSplit';
import { KnowledgeLevelLinks } from '@/components/knowledge-levels/KnowledgeLevelLinks';
import { KnowledgeLevelSeriesLinks } from '@/components/knowledge-levels/KnowledgeLevelSeriesLinks';
import { getLastNVariables } from '@/functions/getLastNVariables';
import RootCard from '@/app/core/navigation/RootCard';
import { getRootCardLayoutId } from '@/components/work-task-types/getRootCardLayoutId';

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

  const workProjectSeriesSchemaList = data.filter(
    (schema) => !schema.name.toLowerCase().includes('carousel')
  );

  return (
    <div className={'p-4'}>
      <RootCard layoutId={getRootCardLayoutId(pathVariables)}>
        <CarouselGroupTabGroup
          collectionData={carouselGroupDtos}
          referencedItemData={workProjectSeriesSchemaList}
          collectionEntityClass={EntityClassMap.carouselGroup}
          referencedEntityClass={EntityClassMap.workProjectSeriesSchema}
          knowledgeLevel={knowledgeLevel}
          updateServerAction={putList}
          postServerAction={postList}
          deleteServerAction={deleteIdList}
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
