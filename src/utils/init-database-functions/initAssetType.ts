'use server';
import data from '@/utils/init-json-data/primary-types/AssetType.json';
import { postList } from '@/api/generated-actions/AssetType';

export async function initAssetType() {
  return postList(data);
}
