import {
  DtoController,
  useEffectSyncDeepEqualWithDispatch,
  useLazyDtoStore
} from 'dto-stores';
import { CarouselOptionDto } from '@/api/dtos/CarouselOptionDtoSchema';
import { EntityClassMap } from '@/api/entity-class-map';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { WorkTaskTypeDto } from '@/api/dtos/WorkTaskTypeDtoSchema';
import { Button } from '@nextui-org/button';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import OptionAssigneeList from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_components/OptionAssigneeList';
import { useDtoStoreController } from 'dto-stores/dist/hooks/internal/useDtoStoreController';
import { useMemo, useRef } from 'react';

export type CarouselOptionStateInterface = {
  id: number;
  carouselOrderAssignees: string[];
} & CarouselOptionDto;

export const CarouselOptionState = 'CarouselOptionState';
export default function CarouselOption({
  entity
}: {
  entity: CarouselOptionDto;
}) {
  const { workProjectSeriesSchemaId } = entity;
  const initialState = useRef({ ...entity, assignees: [] });
  // const initialState = useMemo(() => {
  //   const state = { ...entity, assignees: [] };
  //   console.log('rendering memo:', state);
  //   return state;
  // }, [entity]);
  const { currentState, dispatch } = useDtoStoreController(
    initialState.current,
    CarouselOptionState
  );

  useEffectSyncDeepEqualWithDispatch(initialState.current, dispatch);

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
        <Popover>
          <PopoverTrigger>
            <Button className={'w-full h-full'}>
              {workTaskType.name}: {currentState.assignees.length}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <OptionAssigneeList carouselOptionIdList={[entity.id]} />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
