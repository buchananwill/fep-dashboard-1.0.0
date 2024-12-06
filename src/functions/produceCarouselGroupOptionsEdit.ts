import { CarouselGroupDto } from '@/api/generated-types/generated-types_';
import { makeTransientId } from '@/functions/makeTransientId';

export function produceCarouselGroupOptionsEdit(
  updatedKeys: string[],
  carouselGroupDto: CarouselGroupDto
): CarouselGroupDto {
  const carouselOptionList = updatedKeys.map((schemaUuid, index) => ({
    id: makeTransientId(index),
    carouselGroupId: carouselGroupDto.id,
    workProjectSeriesSchemaId: parseInt(schemaUuid)
  }));
  return { ...carouselGroupDto, carouselGroupOptions: carouselOptionList };
}
