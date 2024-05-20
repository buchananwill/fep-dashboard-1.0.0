'use server';

import { HasNumberId } from '@/api/main';
import { GraphDtoPutRequestBody, HasName } from 'react-d3-force-graph';

export async function putGraph<T extends HasNumberId & HasName>(
  graphRequest: GraphDtoPutRequestBody<T>
) {
  console.log(graphRequest);

  return graphRequest.graphDto;
}
