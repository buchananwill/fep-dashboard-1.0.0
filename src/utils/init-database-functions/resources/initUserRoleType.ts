'use server';
import {
  getDtoListByExampleList,
  postOne
} from '@/api/generated-actions/UserRoleType';
import data from '@/utils/init-json-data/primary-types/UserRoleType.json';
import { initSafely } from '@/utils/init-database-functions/initSafely';

export async function initUserRoleType() {
  return initSafely(
    () => getDtoListByExampleList([data]),
    () => postOne(data)
  );
}
