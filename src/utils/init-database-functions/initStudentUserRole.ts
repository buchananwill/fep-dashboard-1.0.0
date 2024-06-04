'use server';
import { postOne } from '@/api/generated-actions/UserRoleType';
import data from '@/utils/init-json-data/primary-types/UserRoleType.json';

export async function initStudentUserRole() {
  return postOne(data);
}


