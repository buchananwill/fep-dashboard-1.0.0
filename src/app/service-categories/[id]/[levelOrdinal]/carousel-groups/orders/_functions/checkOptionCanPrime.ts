import { CarouselOptionStateInterface } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_types';

export function checkOptionCanPrime(
  option: CarouselOptionStateInterface,
  rotationPrimeList: number[],
  filteredOrders: Set<string>
) {
  const hasAssignees = option.carouselOrderAssignees.length > 0;
  const primeListEmpty = rotationPrimeList.length === 0;
  const matchedAnAssignee = option.carouselOrderAssignees.some((order) =>
    filteredOrders.has(order)
  );
  return (hasAssignees && primeListEmpty) || matchedAnAssignee;
}
