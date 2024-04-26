import { EntityClassMap } from '@/app/api/entity-class-map';
import { DtoListChangesTracker } from '@/components/generic/DtoChangesTracker';
import WpssEditGridColList from '@/app/work-project-series-schemas/components/WpssEditGridColList';
import { getDtoListByExampleList as getWorkTaskTypesByExample } from '@/app/api/generated-actions/WorkTaskType';
import { getDtoListByExampleList as getWorkProjectSeriesSchemasByExample } from '@/app/api/generated-actions/WorkProjectSeriesSchema';
import { MissingData } from '@/components/generic/MissingData';

const levelOrdinal = 9;

export default async function Page({}: {}) {
  const wttResponse = await getWorkTaskTypesByExample([
    { knowledgeLevelLevelOrdinal: levelOrdinal }
  ]);

  const { data: workTaskTypes } = wttResponse;

  if (workTaskTypes === undefined)
    return <MissingData response={wttResponse} />;

  const wpssActionResponse = await getWorkProjectSeriesSchemasByExample(
    workTaskTypes.map((wtt) => ({ workTaskTypeId: wtt.id }))
  );

  const { data: wpssData } = wpssActionResponse;

  if (wpssData === undefined)
    return <MissingData response={wpssActionResponse} />;

  return (
    <>
      <DtoListChangesTracker
        dtoList={wpssData}
        entityName={EntityClassMap.workProjectSeriesSchema}
      />
      <WpssEditGridColList />
    </>
  );
}
