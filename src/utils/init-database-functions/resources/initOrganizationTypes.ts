import { KnowledgeLevelDto } from '@/api/zod-schemas/KnowledgeLevelDtoSchema';
import { initSafely } from '@/utils/init-database-functions/initSafely';
import {
  getDtoListByExampleList,
  postList
} from '@/api/generated-actions/OrganizationType';
import { KnowledgeLevelSeriesDto } from '@/api/generated-types/generated-types';

export async function initOrganizationTypes(
  serviceCategoryDto: KnowledgeLevelSeriesDto,
  promiseLevels: Promise<KnowledgeLevelDto[]>
) {
  return promiseLevels.then((knowledgeLevels) => {
    const organizationTypeDtoList = knowledgeLevels.map((kLevel) => ({
      id: NaN,
      name: `${serviceCategoryDto.knowledgeLevelDescriptor} ${kLevel.levelOrdinal}`
    }));
    return initSafely(
      () => getDtoListByExampleList(organizationTypeDtoList),
      () => postList(organizationTypeDtoList)
    );
  });
}
