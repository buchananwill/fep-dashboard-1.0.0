'use server';
import data from '@/utils/init-json-data/primary-types/AssetType.json';
import {
  getDtoListByExampleList,
  postList
} from '@/api/generated-actions/AssetType';
import { initSafely } from '@/utils/init-database-functions/initSafely';

export async function initAssetType() {
  return initSafely(
    () => getDtoListByExampleList(data),
    () => postList(data)
  );
}
