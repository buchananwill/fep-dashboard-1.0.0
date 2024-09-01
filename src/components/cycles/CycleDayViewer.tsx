'use client';
import { memo, useCallback, useEffect, useMemo, useTransition } from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { numberToWeekLetter } from '@/functions/cycles/numberToWeekLetter';
import { getWeekNumberInt } from '@/functions/cycles/groupCycleSubspansByDay';
import { Button } from '@nextui-org/button';
import CycleSubspan from '@/components/cycles/CycleSubspan';
import { CycleDayFetcherProps } from '@/components/cycles/CycleDayFetcher';

import { isNotUndefined } from '@/api/main';
import { useGlobalController } from 'selective-context';
import { EntityClassMap } from '@/api/entity-class-map';
import { templateCycleSubspan } from '@/components/cycles/CycleViewer';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { CycleSubspanDto } from '@/api/zod-schemas/CycleSubspanDtoSchema';
import {
  DispatchList,
  DtoUiListSome,
  Identifier,
  NamespacedHooks,
  useMasterListInteraction
} from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { TransientIdOffset } from '@/api/literals';

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
      const transientId =
        TransientIdOffset +
        currentState.length * (cycleDay.zeroIndexedCycleDay + 1);
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
    [cycleDay.zeroIndexedCycleDay, currentState, cycle.id, dispatch]
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
    <Card classNames={{ base: 'w-fit', body: 'w-fit' }}>
      {/*<DtoControllerArray entityClass={cycleSubspan} dtoList={currentState} />*/}

      <CardHeader className={'justify-center gap-2 text-center'}>
        {cycleDay.day}: {numberToWeekLetter(getWeekNumberInt(cycleDay))}
        <Button
          size={'sm'}
          className={'relative'}
          onPress={() =>
            startTransition(async () => {
              masterListCallback();
            })
          }
        >
          Add Period
          <PendingOverlay pending={pending} />
        </Button>
      </CardHeader>
      <CardBody className={'gap-1'}>
        {cycleSubspanIdList.length > 0 && (
          <DtoUiListSome
            entityIdList={cycleSubspanIdList}
            entityClass={cycleSubspan}
            renderAs={MemoCycleSubspan}
          />
        )}
      </CardBody>
    </Card>
  );
}

const MemoCycleSubspan = memo(CycleSubspan);
