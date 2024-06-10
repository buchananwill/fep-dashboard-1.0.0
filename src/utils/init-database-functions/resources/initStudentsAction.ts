'use server';

import { constructUrl } from '@/api/actions/template-base-endpoints';
import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
const url = constructUrl('/api/v2/generate/studentsWithCarouselOrders');
import gcseJson from '@/utils/init-json-data/carousel-orders/gcseFrequencyMap.json';
import aLevelJson from '@/utils/init-json-data/carousel-orders/aLevelFrequencyMap.json';

export async function initStudents(params: {
  serviceCategoryId: number;
  levelOrdinal: number;
  howMany: number;
}) {
  let body = {};
  const { levelOrdinal } = params;
  if (levelOrdinal < 9) {
    body = {};
  } else if (levelOrdinal < 12) {
    body = gcseJson;
  } else if (levelOrdinal < 14) {
    body = aLevelJson;
  } else {
    throw new Error('levelOrdinal out of range.');
  }
  const paramsStrings = Object.fromEntries(
    Object.entries(params).map(([key, value]) => [key, `${value}`])
  );

  const urlSearchParams = new URLSearchParams(paramsStrings);
  const finalUrl = new URL(url);
  finalUrl.search = urlSearchParams.toString();

  return postEntitiesWithDifferentReturnType(body, finalUrl.toString());
}
