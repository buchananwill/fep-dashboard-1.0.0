'use server';

import { GenericTableDto } from '@/api/types';
import {
  CycleSubspanWithJoinsListDto,
  WorkProjectDto,
  WorkProjectMetricDto
} from '@/api/generated-types/generated-types_';
import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';

export const getWorkProjectMetricsByWpsIdList = async (list: string[]) =>
  postEntitiesWithDifferentReturnType<
    string[],
    GenericTableDto<
      WorkProjectDto,
      CycleSubspanWithJoinsListDto,
      WorkProjectMetricDto,
      number[]
    >
  >(list, constructUrl(['/api/v2/workProject/metrics/heatMapTable']));
