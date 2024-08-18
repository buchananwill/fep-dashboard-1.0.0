import { CarouselGroupDto } from '@/api/zod-schemas/CarouselGroupDtoSchema';

import { TransientIdOffset } from '@/api/literals';

export function produceCarouselGroupOptionsEdit(
  updatedKeys: string[],
  carouselGroupDto: CarouselGroupDto
): CarouselGroupDto {
  const carouselOptionList = updatedKeys.map((schemaUuid, index) => ({
    id: index + TransientIdOffset,
    carouselGroupId: carouselGroupDto.id,
    workProjectSeriesSchemaId: schemaUuid
  }));
  return { ...carouselGroupDto, carouselGroupOptions: carouselOptionList };
}
