import { useDtoStore } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { CarouselOrderDto } from '@/api/dtos/CarouselOrderDtoSchema';

export default function CarouselOrder({ entityId }: { entityId: string }) {
  const { entity, dispatchWithoutControl } = useDtoStore<CarouselOrderDto>({
    entityId,
    entityClass: EntityClassMap.carouselOrder
  });

  return (
    <div className={'bg-white rounded-lg odd:bg-sky-300 even:bg-red-300 p-1'}>
      <div className={''}>User: {entity.userRoleId}</div>
    </div>
  );
}
