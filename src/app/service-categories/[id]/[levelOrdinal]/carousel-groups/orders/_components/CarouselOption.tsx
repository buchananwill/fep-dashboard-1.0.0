import { DtoController, useLazyDtoStore } from 'dto-stores';
import { CarouselOptionDto } from '@/api/dtos/CarouselOptionDtoSchema';
import { EntityClassMap } from '@/api/entity-class-map';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { WorkTaskTypeDto } from '@/api/dtos/WorkTaskTypeDtoSchema';
import { Button } from '@nextui-org/button';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import OptionAssigneeList from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/OptionAssigneeList';

export type CarouselOptionState = {
  id: number;
  assignees: string[];
} & CarouselOptionDto;

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
      <DtoController
        dto={{ ...entity, assignees: [] }}
        entityClass={'CarouselOptionState'}
      />
      {loading ? (
        <PendingOverlay pending={true} />
      ) : (
        <Popover>
          <PopoverTrigger>
            <Button className={'w-full h-full'}>{workTaskType.name}</Button>
          </PopoverTrigger>
          <PopoverContent>
            <OptionAssigneeList carouselOptionIdList={[entity.id]} />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
