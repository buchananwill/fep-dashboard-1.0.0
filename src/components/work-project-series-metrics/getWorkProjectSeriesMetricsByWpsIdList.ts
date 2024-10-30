'use server';

import { GenericTableDto } from '@/api/types';
import {
  CycleSubspanWithJoinsListDto,
  WorkProjectSeriesDto,
  WorkProjectSeriesMetricDto
} from '@/api/generated-types/generated-types';
import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';

export const getWorkProjectSeriesMetricsByWpsIdList = async (list: string[]) =>
  postEntitiesWithDifferentReturnType<
    string[],
    GenericTableDto<
      WorkProjectSeriesDto,
      CycleSubspanWithJoinsListDto,
      WorkProjectSeriesMetricDto,
      number[]
    >
  >(list, constructUrl(['/api/v2/workProjectSeries/metrics/heatMapTable']));
