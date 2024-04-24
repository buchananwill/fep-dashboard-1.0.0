import { getDtoListByExampleList as getSchemaBundleByExampleList } from '@/app/api/generated-actions/WorkSeriesSchemaBundle';
import { MissingData } from '@/components/generic/MissingData';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { getDtoListByExampleList as getWorkTaskTypesByExampleList } from '@/app/api/generated-actions/WorkTaskType';
import { WorkProjectSeriesSchemaDto } from '@/app/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { getDtoListByExampleList } from '@/app/api/generated-actions/WorkProjectSeriesSchema';
import CollectionChooserTabGroup from '@/app/work-project-series-schemas/components/CollectionChooserTabGroup';
import AllBundlesTotal from '@/app/work-project-series-schemas/bundles/components/AllBundlesTotal';
import { KnowledgeLevelDto } from '@/app/api/dtos/KnowledgeLevelDtoSchema';
import { SECONDARY_EDUCATION_CATEGORY_ID } from '@/app/api/main';
import WorkSeriesSchemaBundleTabGroup from '@/app/work-project-series-schemas/bundles/components/WorkSeriesSchemaBundleTabGroup';
import { EntityNamesMap } from '@/app/api/entity-names-map';
import { getWorkProjectSeriesSchemasByKnowledgeLevel } from '@/app/work-project-series-schemas/functions/getWorkProjectSeriesSchemasByKnowledgeLevel';

const levelOrdinal = 9;

export default async function Page() {
  const levelPartial: Partial<KnowledgeLevelDto> = {
    levelOrdinal: levelOrdinal,
    serviceCategoryId: SECONDARY_EDUCATION_CATEGORY_ID
  };
  const bundleActionResponse = await getSchemaBundleByExampleList([
    { knowledgeLevel: levelPartial }
  ]);
  const { data } = bundleActionResponse;
  if (data === undefined)
    return <MissingData response={bundleActionResponse} />;

  const workProjectSeriesSchemaResponse =
    await getWorkProjectSeriesSchemasByKnowledgeLevel(levelOrdinal);

  if (workProjectSeriesSchemaResponse === undefined)
    return <MissingData response={workProjectSeriesSchemaResponse} />;
  if (workProjectSeriesSchemaResponse.data === undefined)
    return <MissingData response={workProjectSeriesSchemaResponse} />;
  const { data: workProjectSeriesSchemaList } = workProjectSeriesSchemaResponse;

  return (
    <Card className={'w-fit'}>
      <CardHeader className={'flex justify-between'}>
        <span>Bundles Year {levelOrdinal} </span>
        <span>
          <AllBundlesTotal /> Periods All Bundles
        </span>
      </CardHeader>
      <CardBody>
        <WorkSeriesSchemaBundleTabGroup
          collectionData={data}
          referencedItemData={workProjectSeriesSchemaList}
          collectionEntityClass={EntityNamesMap.workSeriesSchemaBundle}
          referencedEntityClass={EntityNamesMap.workProjectSeriesSchema}
        />
      </CardBody>
    </Card>
  );
}
