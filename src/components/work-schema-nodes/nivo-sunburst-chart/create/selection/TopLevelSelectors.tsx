'use client';
import { workTaskTypeName } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/CreateViaSunburst';
import { EntityClassMap } from '@/api/entity-class-map';
import { useCallback, useRef } from 'react';
import { CycleDto, HasName } from '@/api/generated-types/generated-types';
import { HasNumberId } from '@/api/types';
import { useGlobalDispatchAndListener } from 'selective-context';
import { KnowledgeLevelSeriesGroupContextKey } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelSeriesGroupManager';
import { TemplateKnowledgeLevelSeriesGroup } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/templateKnowledgeLevelSeriesGroup';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { ControlledSelector } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/selection/ControlledSelector';
import { updateNestedValue } from '@/functions/updateNestedValue';

export default function TopLevelSelectors() {
  const listenerKey = useUuidListenerKey();
  const { currentState, dispatchWithoutControl } = useGlobalDispatchAndListener(
    {
      contextKey: KnowledgeLevelSeriesGroupContextKey,
      initialValue: TemplateKnowledgeLevelSeriesGroup,
      listenerKey
    }
  );

  const selectTaskType = useCallback(
    (taskTypeName: (HasName & HasNumberId) | null) => {
      dispatchWithoutControl((template) =>
        updateNestedValue(
          template,
          'workTaskTypeName',
          taskTypeName ?? undefined
        )
      );
    },
    [dispatchWithoutControl]
  );

  const selectCycle = useCallback(
    (cycle: CycleDto | null) => {
      dispatchWithoutControl((template) =>
        updateNestedValue(template, 'cycle', cycle ?? undefined)
      );
    },
    [dispatchWithoutControl]
  );

  return (
    <div className={'grid grid-cols-2 gap-2 p-2'}>
      <ControlledSelector<number, HasName & HasNumberId>
        aria-label={'Task Type'}
        entityClass={workTaskTypeName}
        entityId={currentState.workTaskTypeName?.id ?? null}
        label={'Task Type'}
        labelPath={'name'}
        selectionCallback={selectTaskType}
      />
      <ControlledSelector<number, CycleDto>
        aria-label={'Target Cycle'}
        entityClass={EntityClassMap.cycle}
        entityId={currentState.cycle?.id ?? null}
        label={'Target Cycle'}
        labelPath={'id'}
        selectionCallback={selectCycle}
      />
    </div>
  );
}
