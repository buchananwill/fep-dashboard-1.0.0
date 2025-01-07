'use server';

import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';

import { API_V2_URL } from '@/api/server-literals';

export async function postAutoCarouselGroupOptions(anyList: any[]) {
  return postEntitiesWithDifferentReturnType<any[], boolean>(
    anyList,
    `${API_V2_URL}/workSchemaNodes/autoCarouselGroupOptions`
  );
}
