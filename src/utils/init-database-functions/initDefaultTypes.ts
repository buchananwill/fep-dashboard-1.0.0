'use server';
import { initAssetType } from '@/utils/init-database-functions/initAssetType';
import { initAssetRoleType } from '@/utils/init-database-functions/initAssetRoleType';
import { initInteractionBasedValidation } from '@/utils/init-database-functions/initInteractionBasedValidation';
import { initProviderRoleType } from '@/utils/init-database-functions/initProviderRoleType';
import { initStudentUserRole } from '@/utils/init-database-functions/initStudentUserRole';

export async function initDefaultTypes() {
  return Promise.all([
    initAssetRoleType(),
    initAssetType(),
    initInteractionBasedValidation(),
    initProviderRoleType(),
    initStudentUserRole()
  ]);
}
