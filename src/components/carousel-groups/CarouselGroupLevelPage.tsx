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
import { CarouselGroupOrdersHome } from '@/components/carousel-groups/orders/carouselGroupOrdersPage';
import { getLastNVariables } from '@/functions/getLastNVariables';
import { Card, CardBody, CardHeader } from '@nextui-org/card';

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
  KnowledgeLevelLinks,
  CarouselGroupLevelPage
);

export const CarouselGroupHome = getPathVariableSplitComponent(
  KnowledgeLevelSeriesLinks,
  CarouselGroupLevelLinks
);

export function CarouselGroupsAndOrders(props: LeafComponentProps) {
  const { depth, pathVariables } = props;
  return (
    <div className={'flex flex-col gap-2'}>
      <Card>
        <CardHeader>Carousel Groups</CardHeader>
        <CardBody>
          <CarouselGroupHome {...props} />
        </CardBody>
      </Card>
      {depth === pathVariables.length && (
        <Card>
          <CardHeader>Carousel Group Orders</CardHeader>
          <CardBody>
            <CarouselGroupOrdersHome
              pathVariables={[...props.pathVariables, 'orders']}
              depth={props.depth + 1}
            />
          </CardBody>
        </Card>
      )}
    </div>
  );
}
