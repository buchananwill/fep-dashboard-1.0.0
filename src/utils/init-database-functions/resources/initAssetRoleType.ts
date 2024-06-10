'use server';
import {
  getDtoListByExampleList,
  postOne
} from '@/api/generated-actions/AssetRoleType';
import data from '@/utils/init-json-data/primary-types/AssetRoleType.json';
import { initSafely } from '@/utils/init-database-functions/initSafely';

export async function initAssetRoleType() {
  return initSafely(
    () => getDtoListByExampleList([data]),
    () => postOne(data)
  );
}
