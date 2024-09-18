'use server';

import data from '@/utils/init-json-data/primary-types/InteractionBasedValidation.json';
import { initSafely } from '@/utils/init-database-functions/initSafely';
import { Api } from '@/api/clientApi_';

export async function initInteractionBasedValidation() {
  return initSafely(
    () => Api.InteractionBasedValidation.getDtoListByExampleList([data]),
    () => Api.InteractionBasedValidation.postOne(data)
  );
}
