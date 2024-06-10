'use server';
import { initAssetType } from '@/utils/init-database-functions/resources/initAssetType';
import { initAssetRoleType } from '@/utils/init-database-functions/resources/initAssetRoleType';
import { initInteractionBasedValidation } from '@/utils/init-database-functions/operations/initInteractionBasedValidation';
import { initProviderRoleType } from '@/utils/init-database-functions/resources/initProviderRoleType';
import { initUserRoleType } from '@/utils/init-database-functions/resources/initUserRoleType';

export async function initDefaultTypes() {
  return Promise.all([
    initAssetRoleType(),
    initAssetType(),
    initInteractionBasedValidation(),
    initProviderRoleType(),
    initUserRoleType()
  ]);
}
