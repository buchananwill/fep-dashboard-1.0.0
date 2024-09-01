'use server';
import {
  getDtoListByExampleList,
  postList
} from '@/api/generated-actions/KnowledgeLevel';
import { initSafely } from '@/utils/init-database-functions/initSafely';
import data from '@/utils/init-json-data/service-categories/KnowledgeLevel.json';
import { setAllIdNaN } from '@/utils/init-database-functions/setIdNaN';
import { KnowledgeLevelSeriesDto } from '@/api/generated-types/generated-types';

export async function initKnowledgeLevels(
  knowledgeLevelSeriesDto: KnowledgeLevelSeriesDto
) {
  const noIdDataSet = setAllIdNaN(data).map((kd) => ({
    ...kd,
    knowledgeLevelSeriesId: knowledgeLevelSeriesDto.id
  }));

  return initSafely(
    () => getDtoListByExampleList(noIdDataSet),
    () => postList(noIdDataSet)
  );
}
