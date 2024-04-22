import { getDtoListByExampleList as getSchemaBundleByExampleList } from '@/app/api/generated-actions/WorkSeriesSchemaBundle';
import { MissingData } from '@/components/generic/MissingData';
import { Card, CardHeader } from '@nextui-org/card';
import { getDtoListByExampleList as getWorkTaskTypesByExampleList } from '@/app/api/generated-actions/WorkTaskType';
import { WorkProjectSeriesSchemaDto } from '@/app/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { getDtoListByExampleList } from '@/app/api/generated-actions/WorkProjectSeriesSchema';

const levelOrdinal = 7;

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

  return data.map((bundle, index) => (
    <Card key={index}>
      <CardHeader>{bundle.name}</CardHeader>
    </Card>
  ));
}
