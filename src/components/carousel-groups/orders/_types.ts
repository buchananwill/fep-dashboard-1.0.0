import {
  CarouselOptionDto,
  CarouselOrderItemDto
} from '@/api/generated-types/generated-types_';

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
