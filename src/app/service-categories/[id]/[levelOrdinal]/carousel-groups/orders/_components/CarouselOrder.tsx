import { useDtoStore, useLazyDtoStore } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { CarouselOrderDto } from '@/api/dtos/CarouselOrderDtoSchema';
import { Chip } from '@nextui-org/chip';
import { useDrag } from 'react-dnd';
import { DragTypes } from '@/react-dnd/literals';

export default function CarouselOrder({ entityId }: { entityId: string }) {
  const { entity, dispatchWithoutControl } = useDtoStore<CarouselOrderDto>({
    entityId,
    entityClass: EntityClassMap.carouselOrder
  });
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragTypes.CAROUSEL_ORDER,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
    item: entity
  }));
  // useLazyDtoStore(entity.userRoleId, EntityClassMap);

  return (
    <div
      ref={drag}
      className={'bg-white rounded-lg odd:bg-sky-300 even:bg-red-300 p-1'}
    >
      <div className={''}>User: {entity.userRoleId}</div>
    </div>
  );
}
