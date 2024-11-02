'use server';

import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { API_V2_URL } from '@/api/literals';

export async function postKnowledgeDomains(anyList: any[]) {
  return postEntitiesWithDifferentReturnType<any[], boolean>(
    anyList,
    `${API_V2_URL}/serviceCategories/knowledgeDomains/withParentsAndCssRgb`
  );
}
