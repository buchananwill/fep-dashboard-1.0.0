import { ServiceCategoryDto } from '@/api/zod-schemas/ServiceCategoryDtoSchema';
import { KnowledgeLevelDto } from '@/api/zod-schemas/KnowledgeLevelDtoSchema';
import { initSafely } from '@/utils/init-database-functions/initSafely';
import {
  getDtoListByExampleList,
  postList
} from '@/api/generated-actions/OrganizationType';

export async function initOrganizationTypes(
  serviceCategoryDto: ServiceCategoryDto,
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
