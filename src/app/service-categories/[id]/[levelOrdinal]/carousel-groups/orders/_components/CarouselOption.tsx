import { useLazyDtoStore } from 'dto-stores';
import { CarouselOptionDto } from '@/api/dtos/CarouselOptionDtoSchema';
import { EntityClassMap } from '@/api/entity-class-map';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { WorkTaskTypeDto } from '@/api/dtos/WorkTaskTypeDtoSchema';
import { Button } from '@nextui-org/button';

export default function CarouselOption({
  entity
}: {
  entity: CarouselOptionDto;
}) {
  const { workProjectSeriesSchemaId } = entity;
  const { entity: schema } = useLazyDtoStore<WorkProjectSeriesSchemaDto>(
    workProjectSeriesSchemaId,
    EntityClassMap.workProjectSeriesSchema
  );

  const { entity: workTaskType } = useLazyDtoStore<WorkTaskTypeDto>(
    schema?.workTaskTypeId ?? NaN,
    EntityClassMap.workTaskType
  );

  const loading = !schema || !workTaskType;

  return (
    <div className={'w-full h-full'}>
      {loading ? (
        <PendingOverlay pending={true} />
      ) : (
        <Button className={'w-full h-full'}>{workTaskType.name}</Button>
      )}
    </div>
  );
}
