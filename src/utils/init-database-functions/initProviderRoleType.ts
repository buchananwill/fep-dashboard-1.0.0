'use server';
import { postOne } from '@/api/generated-actions/ProviderRoleType';
import data from '@/utils/init-json-data/primary-types/ProviderRoleType.json';

export async function initProviderRoleType() {
  return postOne(data);
}
