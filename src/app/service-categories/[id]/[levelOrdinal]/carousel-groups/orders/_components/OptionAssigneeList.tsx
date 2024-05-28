import CarouselOrder from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOrder';
import { useOptionAssigneeList } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/useOptionAssigneeList';

export default function OptionAssigneeList({
  carouselOptionIdList
}: {
  carouselOptionIdList: number[];
}) {
  const optionAssigneeListMemo = useOptionAssigneeList(carouselOptionIdList);
  return (
    <div className={'flex flex-col bg-emerald-200 gap-0.5'}>
      {optionAssigneeListMemo.map((order) => (
        <CarouselOrder key={order.id} entityId={order.id} />
      ))}
    </div>
  );
}

