'use server';
import {
  getDtoListByExampleList,
  postOne
} from '@/api/generated-actions/ProviderRoleType';
import data from '@/utils/init-json-data/primary-types/ProviderRoleType.json';
import { initSafely } from '@/utils/init-database-functions/initSafely';

export async function initProviderRoleType() {
  return initSafely(
    () => getDtoListByExampleList([data]),
    () => postOne(data)
  );
}
