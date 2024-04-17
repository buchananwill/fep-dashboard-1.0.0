'use server';

import {
  API_V2_URL,
  BASE_URL,
  IntersectionGeneratorMatrix
} from '@/app/api/main';
import { KnowledgeDomainDto } from '@/app/api/dtos/KnowledgeDomainDtoSchema';
import { KnowledgeLevelDto } from '@/app/api/dtos/KnowledgeLevelDtoSchema';
import { postEntitiesWithDifferentReturnType } from '@/app/api/actions/template-actions';

export async function submitLessonTypeMatrix(
  matrix: IntersectionGeneratorMatrix<KnowledgeDomainDto, KnowledgeLevelDto>
) {
  const url = `${API_V2_URL}/workTaskTypes/generateFromIntersectionMatrix?validationTypeId=1`;

  console.log('submitting...');

  return postEntitiesWithDifferentReturnType(matrix, url);
}
