'use client';
import { memo, useCallback, useEffect, useMemo, useTransition } from 'react';
import { numberToWeekLetter } from '@/functions/cycles/numberToWeekLetter';
import { getWeekNumberInt } from '@/functions/cycles/groupCycleSubspansByDay';
import { Button, Card, ScrollArea } from '@mantine/core';
import CycleSubspan from '@/components/cycles/CycleSubspan';
import { CycleDayFetcherProps } from '@/components/cycles/CycleDayFetcher';

import { isNotUndefined } from '@/api/main';
import { useGlobalController } from 'selective-context';
import { EntityClassMap } from '@/api/entity-class-map';
import { templateCycleSubspan } from '@/components/cycles/CycleViewer';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { CycleSubspanDto } from '@/api/generated-types/generated-types_';
import {
  DispatchList,
  DtoUiListSome,
  Identifier,
  NamespacedHooks,
  useMasterListInteraction
} from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { idDecrementer } from '@/components/work-schema-node-assignments/enrollment-table/GetNextIdDecrement';

export interface CycleDayViewerProps extends CycleDayFetcherProps {
  cycleSubspanDtos: CycleSubspanDto[];
}

const cycleSubspan = EntityClassMap.cycleSubspan;
export default function CycleDayViewer({
  cycleSubspanDtos,
  cycleDay,
  cycle
}: CycleDayViewerProps) {
  const [pending, startTransition] = useTransition();

  const { currentState, dispatch } = useGlobalController<CycleSubspanDto[]>({
    contextKey: `${cycleSubspan}:day:${cycleDay.zeroIndexedCycleDay}`,
    listenerKey: 'controller',
    initialValue: cycleSubspanDtos
  });

  const handleAddCycleSubspan = useCallback(
    (
      dispatchMasterList: DispatchList<CycleSubspanDto>,
      dispatchAddedList: DispatchList<Identifier>
    ) => {
      const transientId = idDecrementer();
      const newCycleSubspan: CycleSubspanDto = {
        ...templateCycleSubspan,
        zeroIndexedCycleDay: cycleDay.zeroIndexedCycleDay,
        parentCycleId: cycle.id,
        id: transientId
      };

      const addCycleSubspan = (csList: CycleSubspanDto[]) => [
        ...csList,
        newCycleSubspan
      ];
      const addId = (list: Identifier[]) => [...list, transientId];
      dispatch(addCycleSubspan);
      dispatchMasterList(addCycleSubspan);
      dispatchAddedList(addId);
    },
    [cycle.id, dispatch, cycleDay.zeroIndexedCycleDay]
  );

  const dispatchInitialList = NamespacedHooks.useDispatch<CycleSubspanDto[]>(
    EntityClassMap.cycleSubspan,
    KEY_TYPES.MASTER_LIST
  );
  const masterListCallback = useMasterListInteraction(
    EntityClassMap.cycleSubspan,
    handleAddCycleSubspan
  );

  const cycleSubspanIdList = useMemo(() => {
    return currentState.filter(isNotUndefined).map((dto) => dto.id);
  }, [currentState]);

  useEffect(() => {
    dispatchInitialList((list) => [...list, ...cycleSubspanDtos]);
  }, [dispatchInitialList, cycleSubspanDtos]);

  return (
    <Card
      classNames={{
        root: 'w-fit'
      }}
    >
      <div className={'flex justify-around gap-2 align-middle'}>
        <span className={'inline-block place-content-center text-nowrap'}>
          {cycleDay.day}: {numberToWeekLetter(getWeekNumberInt(cycleDay))}
        </span>
        <Button
          onClick={() =>
            startTransition(async () => {
              masterListCallback();
            })
          }
          loading={pending}
        >
          Add Period
          {/*<PendingOverlay pending={pending} />*/}
        </Button>
      </div>

      <ScrollArea classNames={{ root: 'border-1 rounded-lg p-0.5' }}>
        {cycleSubspanIdList.length > 0 && (
          <DtoUiListSome
            entityIdList={cycleSubspanIdList}
            entityClass={cycleSubspan}
            renderAs={MemoCycleSubspan}
          />
        )}
      </ScrollArea>
    </Card>
  );
}

const MemoCycleSubspan = memo(CycleSubspan);
