import { useDtoStore } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { CarouselOrderDto } from '@/api/generated-types/generated-types_';
import { useCarouselOrderModalTrigger } from '@/components/carousel-groups/orders/order-modal/CarouselOrderModal';

export default function CarouselOrder({ entityId }: { entityId: string }) {
  const { entity, dispatchWithoutControl } = useDtoStore<CarouselOrderDto>({
    entityId,
    entityClass: EntityClassMap.carouselOrder
  });
  const triggerModal = useCarouselOrderModalTrigger(entityId);

  return (
    <button
      className={'rounded-lg bg-white p-1 odd:bg-sky-300 even:bg-red-300'}
      onClick={triggerModal}
    >
      <div className={''}>User: {entity.userRoleId}</div>
    </button>
  );
}
