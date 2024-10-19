'use client';
import { memo, useCallback, useEffect, useMemo, useTransition } from 'react';
import { numberToWeekLetter } from '@/functions/cycles/numberToWeekLetter';
import { getWeekNumberInt } from '@/functions/cycles/groupCycleSubspansByDay';
import { Button, Card } from '@mantine/core';
import CycleSubspan from '@/components/cycles/CycleSubspan';
import { CycleDayFetcherProps } from '@/components/cycles/CycleDayFetcher';

import { isNotUndefined } from '@/api/main';
import { useGlobalController } from 'selective-context';
import { EntityClassMap } from '@/api/entity-class-map';
import { templateCycleSubspan } from '@/components/cycles/CycleViewer';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { CycleSubspanDto } from '@/api/generated-types/generated-types';
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
    [cycle.id, dispatch, cycleDay]
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
      <Card.Section>
        <div
          className={
            'flex w-full items-center justify-center gap-2 p-2 text-center'
          }
        >
          <span className={'inline-block'}>
            {cycleDay.day}: {numberToWeekLetter(getWeekNumberInt(cycleDay))}
          </span>
          <Button
            size={'sm'}
            className={'relative inline-block'}
            onClick={() =>
              startTransition(async () => {
                masterListCallback();
              })
            }
          >
            Add Period
            <PendingOverlay pending={pending} />
          </Button>
        </div>
      </Card.Section>
      <div className={'flex flex-col gap-1'}>
        {cycleSubspanIdList.length > 0 && (
          <DtoUiListSome
            entityIdList={cycleSubspanIdList}
            entityClass={cycleSubspan}
            renderAs={MemoCycleSubspan}
          />
        )}
      </div>
    </Card>
  );
}

const MemoCycleSubspan = memo(CycleSubspan);
