import { getDtoListByExampleList as getSchemaBundleByExampleList } from '@/app/api/generated-actions/WorkSeriesSchemaBundle';
import { MissingData } from '@/components/generic/MissingData';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { getDtoListByExampleList as getWorkTaskTypesByExampleList } from '@/app/api/generated-actions/WorkTaskType';
import { WorkProjectSeriesSchemaDto } from '@/app/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { getDtoListByExampleList } from '@/app/api/generated-actions/WorkProjectSeriesSchema';
import BundleTabGroup from '@/app/work-project-series-schemas/bundles/components/BundleTabGroup';

const levelOrdinal = 9;

export default async function Page() {
  const bundleActionResponse = await getSchemaBundleByExampleList([
    { knowledgeLevelLevelOrdinal: levelOrdinal }
  ]);
  const { data } = bundleActionResponse;
  if (data === undefined)
    return <MissingData response={bundleActionResponse} />;

  const workProjectSeriesSchemaResponse = await getWorkTaskTypesByExampleList([
    { knowledgeLevelLevelOrdinal: levelOrdinal }
  ]).then((r) => {
    const exampleList = r.data?.map(
      (wtt) =>
        ({ workTaskTypeId: wtt.id }) as Partial<WorkProjectSeriesSchemaDto>
    );
    if (exampleList) return getDtoListByExampleList(exampleList);
    else return undefined;
  });

  if (workProjectSeriesSchemaResponse === undefined)
    return <MissingData response={workProjectSeriesSchemaResponse} />;
  if (workProjectSeriesSchemaResponse.data === undefined)
    return <MissingData response={workProjectSeriesSchemaResponse} />;
  const { data: workProjectSeriesSchemaList } = workProjectSeriesSchemaResponse;

  return (
    <Card>
      <CardHeader>Bundles!</CardHeader>
      <CardBody>
        <BundleTabGroup
          collectionData={data}
          referencedItemData={workProjectSeriesSchemaList}
        />
      </CardBody>
    </Card>
  );
}
