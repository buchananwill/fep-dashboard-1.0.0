'use server';
import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { HasNumberId } from '@/api/types';
import { HasNameDto } from '@/api/generated-types/generated-types_';

const namesUrl = constructUrl(['/api', 'v2', 'workTypes', 'names']);
export async function getNames() {
  return getWithoutBody<(HasNumberId & HasNameDto)[]>(namesUrl);
}
