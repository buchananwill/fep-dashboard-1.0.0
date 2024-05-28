import { useSingleOptionAssigneeList } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/useOrderItemAssigneeList';
import CarouselOrderItem from './CarouselOrderItem';
import { CarouselOptionStateInterface } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOption';

export default function OrderItemAssigneeList({
  carouselOptionDto
}: {
  carouselOptionDto: CarouselOptionStateInterface;
}) {
  const optionAssigneeListMemo = useSingleOptionAssigneeList(carouselOptionDto);
  return (
    <div className={'grid grid-cols-4 bg-emerald-200 bg-opacity-0 gap-0.5'}>
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
