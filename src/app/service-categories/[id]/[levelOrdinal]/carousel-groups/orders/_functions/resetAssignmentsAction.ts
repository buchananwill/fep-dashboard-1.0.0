'use server';
import { postEntitiesWithDifferentReturnType } from '@/api/actions/template-actions';
import { CarouselGroupDto } from '@/api/dtos/CarouselGroupDtoSchema';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { PartialDeep } from 'type-fest';
import { revalidatePath } from 'next/cache';
import { CarouselOrderDto } from '@/api/dtos/CarouselOrderDtoSchema';

export const resetAssignmentsAction = async (
  entity?: PartialDeep<CarouselGroupDto>
) =>
  postEntitiesWithDifferentReturnType<
    PartialDeep<CarouselGroupDto>,
    CarouselOrderDto[]
  >(
    { id: entity?.id ?? '' },
    constructUrl('/api/v2/carouselGroups/orders/resetCarouselGroupAssignments')
  ).then((r) => {
    revalidatePath('/');
    return r;
  });
