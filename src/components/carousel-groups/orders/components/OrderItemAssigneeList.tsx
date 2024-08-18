import { useSingleOptionAssigneeList } from '@/components/carousel-groups/orders/_hooks/useOrderItemAssigneeList';
import CarouselOrderItem from './CarouselOrderItem';

import { CarouselOptionStateInterface } from '@/components/carousel-groups/orders/_types';

export default function OrderItemAssigneeList({
  carouselOptionDto
}: {
  carouselOptionDto: CarouselOptionStateInterface;
}) {
  const optionAssigneeListMemo = useSingleOptionAssigneeList(carouselOptionDto);
  return (
    <div className={'grid grid-cols-4 gap-0.5 bg-emerald-200 bg-opacity-0'}>
      {optionAssigneeListMemo.length > 0 ? (
        optionAssigneeListMemo.map((orderItem) => (
          <CarouselOrderItem key={orderItem.id} entity={orderItem} />
        ))
      ) : (
        <div className={'col-span-4'}>No assigned orders.</div>
      )}
    </div>
  );
}
