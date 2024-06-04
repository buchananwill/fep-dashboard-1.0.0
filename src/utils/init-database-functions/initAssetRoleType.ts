'use server';
import { postOne } from '@/api/generated-actions/AssetRoleType';
import data from '@/utils/init-json-data/primary-types/AssetRoleType.json';

export async function initAssetRoleType() {
  return postOne(data);
}
