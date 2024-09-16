'use server';
import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { PartialDeep } from 'type-fest';
import { revalidatePath } from 'next/cache';
import {
  CarouselGroupDto,
  CarouselOrderDto
} from '@/api/generated-types/generated-types';

export const resetAssignmentsAction = async (
  entity?: PartialDeep<CarouselGroupDto>
) =>
  postEntitiesWithDifferentReturnType<
    PartialDeep<CarouselGroupDto>,
    CarouselOrderDto[]
  >(
    { id: entity?.id ?? undefined },
    constructUrl('/api/v2/carouselGroups/orders/resetCarouselGroupAssignments')
  ).then((r) => {
    revalidatePath('/');
    return r;
  });
