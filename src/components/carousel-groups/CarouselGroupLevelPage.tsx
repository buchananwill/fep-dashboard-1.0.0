import { getDtoListByExampleList as getKnowledgeLevelsByExampleList } from '@/api/generated-actions/KnowledgeLevel';
import { EntityClassMap } from '@/api/entity-class-map';
import CarouselGroupTabGroup from '@/components/carousel-groups/_components/CarouselGroupTabGroup';
import { getLevelPartialAndSchemaList } from '@/app/work-project-series-schemas/_functions/getLevelPartialAndSchemaList';
import {
  deleteIdList,
  getDtoListByExampleList as getCarouselGroupsByExampleList,
  postList,
  putList
} from '@/api/generated-actions/CarouselGroup';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { getPathVariableSplitComponent } from '@/components/generic/PathVariableSplit';
import { ServiceCategoryLevelLinks } from '@/app/work-project-series-schemas/ServiceCategoryLevelLinks';
import { KnowledgeLevelSeriesLinks } from '@/components/knowledge-domains/KnowledgeLevelSeriesLinks';
import { CarouselGroupOrdersHome } from '@/components/carousel-groups/orders/carouselGroupOrdersPage';
import { getLastNVariables } from '@/app/work-project-series-schemas/getLastNVariables';

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
  );
}

export const CarouselGroupLevelLinks = getPathVariableSplitComponent(
  ServiceCategoryLevelLinks,
  CarouselGroupLevelPage
);

export const CarouselGroupHome = getPathVariableSplitComponent(
  KnowledgeLevelSeriesLinks,
  CarouselGroupLevelLinks
);

export function CarouselGroupsAndOrders(props: LeafComponentProps) {
  const { depth, pathVariables } = props;
  return (
    <>
      <CarouselGroupHome {...props} />
      {depth === pathVariables.length && (
        <CarouselGroupOrdersHome
          pathVariables={[...props.pathVariables, 'orders']}
          depth={props.depth + 1}
        />
      )}
    </>
  );
}
