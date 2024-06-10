'use server';
import {
  getDtoListByExampleList,
  postOne
} from '@/api/generated-actions/InteractionBasedValidation';
import data from '@/utils/init-json-data/primary-types/InteractionBasedValidation.json';
import { initSafely } from '@/utils/init-database-functions/initSafely';

export async function initInteractionBasedValidation() {
  return initSafely(
    () => getDtoListByExampleList([data]),
    () => postOne(data)
  );
}
