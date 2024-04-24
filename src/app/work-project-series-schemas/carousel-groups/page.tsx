import { MissingData } from '@/components/generic/MissingData';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { getDtoListByExampleList as getCarouselGroupsByExampleList } from '@/app/api/generated-actions/CarouselGroup';
import AllBundlesTotal from '@/app/work-project-series-schemas/bundles/components/AllBundlesTotal';
import { KnowledgeLevelDto } from '@/app/api/dtos/KnowledgeLevelDtoSchema';
import { SECONDARY_EDUCATION_CATEGORY_ID } from '@/app/api/main';
import WorkSeriesSchemaBundleTabGroup from '@/app/work-project-series-schemas/bundles/components/WorkSeriesSchemaBundleTabGroup';
import { EntityNamesMap } from '@/app/api/entity-names-map';
import { getWorkProjectSeriesSchemasByKnowledgeLevel } from '@/app/work-project-series-schemas/functions/getWorkProjectSeriesSchemasByKnowledgeLevel';
import CarouselGroupTabGroup from '@/app/work-project-series-schemas/carousel-groups/components/CarouselGroupTabGroup';

const levelOrdinal = 9;

export default async function Page() {
  const levelPartial: Partial<KnowledgeLevelDto> = {
    levelOrdinal: levelOrdinal,
    serviceCategoryId: SECONDARY_EDUCATION_CATEGORY_ID
  };
  const carouselGroupsActionResponse = await getCarouselGroupsByExampleList([
    { knowledgeLevel: levelPartial }
  ]);
  const { data } = carouselGroupsActionResponse;
  if (data === undefined)
    return <MissingData response={carouselGroupsActionResponse} />;
  const workProjectSeriesSchemaResponse =
    await getWorkProjectSeriesSchemasByKnowledgeLevel(levelOrdinal);

  if (workProjectSeriesSchemaResponse === undefined)
    return <MissingData response={workProjectSeriesSchemaResponse} />;
  if (workProjectSeriesSchemaResponse.data === undefined)
    return <MissingData response={workProjectSeriesSchemaResponse} />;
  const { data: workProjectSeriesSchemaList } = workProjectSeriesSchemaResponse;

  return (
    <Card className={'w-fit'}>
      <CardHeader className={'flex justify-center'}>
        <span>Carousel Groups Year {levelOrdinal} </span>
      </CardHeader>
      <CardBody>
        <CarouselGroupTabGroup
          collectionData={data}
          referencedItemData={workProjectSeriesSchemaList}
          collectionEntityClass={EntityNamesMap.carouselGroup}
          referencedEntityClass={EntityNamesMap.workProjectSeriesSchema}
        />
      </CardBody>
    </Card>
  );
}
