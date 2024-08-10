'use server';
import {
  getDtoListByExampleList,
  postList
} from '@/api/generated-actions/KnowledgeLevel';
import { initSafely } from '@/utils/init-database-functions/initSafely';
import { ServiceCategoryDto } from '@/api/zod-schemas/ServiceCategoryDtoSchema';
import data from '@/utils/init-json-data/service-categories/KnowledgeLevel.json';
import { setAllIdNaN } from '@/utils/init-database-functions/setIdNaN';

export async function initKnowledgeLevels(
  serviceCategoryDto: ServiceCategoryDto
) {
  const noIdDataSet = setAllIdNaN(data).map((kd) => ({
    ...kd,
    serviceCategoryId: serviceCategoryDto.id
  }));

  return initSafely(
    () => getDtoListByExampleList(noIdDataSet),
    () => postList(noIdDataSet)
  );
}
