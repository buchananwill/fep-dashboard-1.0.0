import { MissingData } from '@/components/generic/MissingData';
import { getDtoListByExampleList as getCarouselGroupsByExampleList } from '@/app/api/generated-actions/CarouselGroup';
import { getDtoListByExampleList as getKnowledgeLevelsByExampleList } from '@/app/api/generated-actions/KnowledgeLevel';
import { KnowledgeLevelDto } from '@/app/api/dtos/KnowledgeLevelDtoSchema';
import { SECONDARY_EDUCATION_CATEGORY_ID } from '@/app/api/main';
import { EntityClassMap } from '@/app/api/entity-class-map';
import { getWorkProjectSeriesSchemasByKnowledgeLevel } from '@/app/work-project-series-schemas/functions/getWorkProjectSeriesSchemasByKnowledgeLevel';
import CarouselGroupTabGroup from '@/app/work-project-series-schemas/carousel-groups/components/CarouselGroupTabGroup';

const levelOrdinal = 9;

export default async function Page() {
  const levelPartial: Partial<KnowledgeLevelDto> = {
    levelOrdinal: levelOrdinal,
    serviceCategoryId: SECONDARY_EDUCATION_CATEGORY_ID
  };

  const levelResponse = await getKnowledgeLevelsByExampleList([levelPartial]);

  const kLevelList = levelResponse.data;

  if (kLevelList === undefined || kLevelList.length === 0)
    return <MissingData response={levelResponse} />;

  const [knowledgeLevel] = kLevelList;

  const carouselGroupsActionResponse = await getCarouselGroupsByExampleList([
    { knowledgeLevel: knowledgeLevel }
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
  const workProjectSeriesSchemaList =
    workProjectSeriesSchemaResponse.data.filter(
      (schema) => !schema.name.toLowerCase().includes('carousel')
    );

  return (
    <CarouselGroupTabGroup
      collectionData={data}
      referencedItemData={workProjectSeriesSchemaList}
      collectionEntityClass={EntityClassMap.carouselGroup}
      referencedEntityClass={EntityClassMap.workProjectSeriesSchema}
      knowledgeLevel={knowledgeLevel}
    />
  );
}
