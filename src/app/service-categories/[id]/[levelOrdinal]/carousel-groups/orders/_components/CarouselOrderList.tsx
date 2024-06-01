import { EntityClassMap } from '@/api/entity-class-map';
import CarouselOrder from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/CarouselOrder';
import { getEntityNamespaceContextKey } from 'dto-stores/dist/functions/name-space-keys/getEntityNamespaceContextKey';

export default function CarouselOrderList({
  orderIdList
}: {
  orderIdList: string[];
}) {
  return orderIdList.map((orderId) => (
    <CarouselOrder
      entityId={orderId}
      key={getEntityNamespaceContextKey(EntityClassMap.carouselOrder, orderId)}
    />
  ));
}
