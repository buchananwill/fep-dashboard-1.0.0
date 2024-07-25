'use server';

import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { CycleSubspanWithJoinsListDto } from '@/api/dtos/CycleSubspanWithJoinsListDtoSchema';

export async function getCycleSubspansWithJoins(cycleId: number) {
  return getWithoutBody<CycleSubspanWithJoinsListDto>(
    constructUrl(
      `/api/v2/time/cycleSubspans/cycleSubspansWithJoinsList/${cycleId}`
    )
  );
}
