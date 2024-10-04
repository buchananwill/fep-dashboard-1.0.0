'use server';

import { GraphDtoPutRequestBody, HasName } from 'react-d3-force-wrapper';
import { HasNumberId } from '@/api/types';

export async function putGraph<T extends HasNumberId & HasName>(
  graphRequest: GraphDtoPutRequestBody<T>
) {
  console.log(graphRequest); // KEEP LOG

  return graphRequest.graphDto;
}
