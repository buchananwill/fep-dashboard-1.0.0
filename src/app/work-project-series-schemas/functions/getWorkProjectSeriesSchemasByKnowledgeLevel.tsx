import { getDtoListByExampleList as getWorkTaskTypesByExampleList } from '@/app/api/generated-actions/WorkTaskType';
import { WorkProjectSeriesSchemaDto } from '@/app/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { getDtoListByExampleList } from '@/app/api/generated-actions/WorkProjectSeriesSchema';

export async function getWorkProjectSeriesSchemasByKnowledgeLevel(
  knowledgeLevelLevelOrdinal: number
) {
  return await getWorkTaskTypesByExampleList([
    { knowledgeLevelLevelOrdinal: knowledgeLevelLevelOrdinal }
  ]).then((r) => {
    const exampleList = r.data?.map(
      (wtt) =>
        ({ workTaskTypeId: wtt.id }) as Partial<WorkProjectSeriesSchemaDto>
    );
    if (exampleList) return getDtoListByExampleList(exampleList);
    else return undefined;
  });
}