'use server';

import { API_V2_URL, BASE_URL, IntersectionGeneratorMatrix } from '@/api/main';

import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { KnowledgeDomainDto } from '@/api/dtos/KnowledgeDomainDtoSchema';
import { KnowledgeLevelDto } from '@/api/dtos/KnowledgeLevelDtoSchema';

export async function submitLessonTypeMatrix(
  matrix: IntersectionGeneratorMatrix<KnowledgeDomainDto, KnowledgeLevelDto>
) {
  const url = `${API_V2_URL}/workTaskTypes/generateFromIntersectionMatrix?validationTypeId=1`;

  return postEntitiesWithDifferentReturnType(matrix, url);
}
