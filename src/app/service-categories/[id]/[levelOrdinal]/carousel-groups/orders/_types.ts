import { CarouselOrderItemDto } from '@/api/zod-schemas/CarouselOrderItemDtoSchema';
import { CarouselOptionDto } from '@/api/zod-schemas/CarouselOptionDtoSchema';

export type CarouselOptionStateInterface = {
  id: number;
  carouselOrderAssignees: string[];
  clashMap: Map<string, CarouselOrderItemDto[]>;
  name?: string;
} & CarouselOptionDto;

export interface OptionRotationTarget {
  carouselOrderItem: CarouselOrderItemDto;
  nextOption: CarouselOptionDto;
}
