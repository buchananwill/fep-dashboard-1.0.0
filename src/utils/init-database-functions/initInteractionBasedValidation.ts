'use server';
import { postOne } from '@/api/generated-actions/InteractionBasedValidation';
import data from '@/utils/init-json-data/primary-types/InteractionBasedValidation.json';

export async function initInteractionBasedValidation() {
  return postOne(data);
}


