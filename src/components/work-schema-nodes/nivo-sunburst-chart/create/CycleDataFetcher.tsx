'use client';
import { useGlobalListener } from 'selective-context';
import {
  knowledgeLevelSeriesGroupContextKey,
  knowledgeLevelGroupTemplate
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelSeriesGroupManager';
import { useMemo } from 'react';
import { getCycleSubspansWithJoins } from '@/components/work-project-series-schema/static-allocation/getCycleSubspansWithJoins';
import { CycleSubspanWithJoinsListDto } from '@/api/generated-types/generated-types';
import { useSimpleApiFetcher } from '@/components/work-task-types/useSimpleApiFetcher';
import { NamespacedHooks, useEffectSyncWithDispatch } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';

export default function CycleDataFetcher() {
  const {
    currentState: { cycle }
  } = useGlobalListener({
    contextKey: knowledgeLevelSeriesGroupContextKey,
    listenerKey: 'cycleFetcher',
    initialValue: knowledgeLevelGroupTemplate
  });
  const dispatchCycleSubspans = NamespacedHooks.useDispatch(
    EntityClassMap.cycleSubspan,
    KEY_TYPES.MASTER_LIST
  );

  const cycleId = cycle ? cycle.id : undefined;

  const cycleFetchFunction = useMemo(() => {
    return async function (): Promise<CycleSubspanWithJoinsListDto[]> {
      if (cycleId) {
        return getCycleSubspansWithJoins(cycleId);
      } else {
        return [];
      }
    };
  }, [cycleId]);

  const cycleSubspanWithJoinsListDtos = useSimpleApiFetcher(cycleFetchFunction);

  useEffectSyncWithDispatch(
    cycleSubspanWithJoinsListDtos,
    dispatchCycleSubspans
  );

  return null;
}
