'use server';

import { API_V2_URL, IntersectionGeneratorMatrix } from '@/api/main';
import data from '@/utils/init-json-data/primary-types/InteractionBasedValidation.json';
import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { KnowledgeDomainDto } from '@/api/dtos/KnowledgeDomainDtoSchema';
import { KnowledgeLevelDto } from '@/api/dtos/KnowledgeLevelDtoSchema';
import { getDtoListByExampleList } from '@/api/generated-actions/InteractionBasedValidation';

export async function initWorkTaskTypesFromMatrix(
  matrix: IntersectionGeneratorMatrix<KnowledgeDomainDto, KnowledgeLevelDto>
) {
  const validationType = await getDtoListByExampleList([data]);
  const url = `${API_V2_URL}/workTaskTypes/generateFromIntersectionMatrix?validationTypeId=${validationType[0].id}`;

  return postEntitiesWithDifferentReturnType(matrix, url);
}