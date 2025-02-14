'use client';
import { workTypeCategory } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/CreateViaSunburst';
import { EntityClassMap } from '@/api/entity-class-map';
import {
  CycleDto,
  HasNameDto,
  KnowledgeLevelSeriesDto
} from '@/api/generated-types/generated-types_';
import { HasNumberId } from '@/api/types';
import { useGlobalDispatchAndListener } from 'selective-context';
import { KnowledgeLevelSeriesGroupContextKey } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelSeriesGroupManager';
import { TemplateKnowledgeLevelSeriesGroup } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/templateKnowledgeLevelSeriesGroup';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { ControlledSelector } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/selection/ControlledSelector';
import { getStartCaseDomainAlias } from '@/api/getDomainAlias';
import { useNestedUpdateCallback } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/selection/useNestedUpdateCallback';
import { useCallback, useRef } from 'react';
import { ConfirmActionModal } from '@/components/modals/ConfirmActionModal';
import { Loader } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default function TopLevelSelectors() {
  const listenerKey = useUuidListenerKey();
  const { currentState, dispatchWithoutControl } = useGlobalDispatchAndListener(
    {
      contextKey: KnowledgeLevelSeriesGroupContextKey,
      initialValue: TemplateKnowledgeLevelSeriesGroup,
      listenerKey
    }
  );

  const selectTaskType = useNestedUpdateCallback(
    dispatchWithoutControl,
    'workTypeCategory'
  );

  const selectCycle = useNestedUpdateCallback(dispatchWithoutControl, 'cycle');
  const selectKnowledgeLevelSeries = useNestedUpdateCallback(
    dispatchWithoutControl,
    'knowledgeLevelSeries'
  );

  const [opened, { open, close }] = useDisclosure();

  const proposedUpdateRef = useRef<KnowledgeLevelSeriesDto | undefined>(
    undefined
  );

  const interceptSeriesChange = useCallback(
    (updatedValue: KnowledgeLevelSeriesDto | undefined) => {
      if (currentState.knowledgeLevelSeries !== updatedValue) {
        proposedUpdateRef.current = updatedValue;
        open();
      }
    },
    [open, currentState]
  );

  const confirmUpdate = useCallback(() => {
    selectKnowledgeLevelSeries(proposedUpdateRef.current);
  }, [selectKnowledgeLevelSeries]);

  const klsLabel = getStartCaseDomainAlias('knowledgeLevelSeries');

  return currentState === TemplateKnowledgeLevelSeriesGroup ? (
    <Loader />
  ) : (
    <div className={'grid grid-cols-2 gap-2 p-2'}>
      <div className={'col-span-2 flex justify-center p-4'}>
        <ControlledSelector<number, KnowledgeLevelSeriesDto>
          entityClass={EntityClassMap.knowledgeLevelSeries}
          entityId={currentState.knowledgeLevelSeries?.id ?? null}
          labelPath={'name'}
          selectionCallback={interceptSeriesChange}
        />
      </div>
      <ControlledSelector<number, HasNameDto & HasNumberId>
        aria-label={'Task Type'}
        entityClass={workTypeCategory}
        entityId={currentState.workTypeCategory?.id ?? null}
        labelPath={'name'}
        selectionCallback={selectTaskType}
      />
      <ControlledSelector<number, CycleDto>
        aria-label={'Target Cycle'}
        entityClass={EntityClassMap.cycle}
        entityId={currentState.cycle?.id ?? null}
        labelPath={'id'}
        selectionCallback={selectCycle}
      />
      <ConfirmActionModal
        changeDescription={klsLabel}
        changeDetails={
          <span>
            Changing {klsLabel} to{' '}
            <strong>{proposedUpdateRef.current?.name}</strong> will reset the
            creator.
          </span>
        }
        opened={opened}
        onClose={close}
        onConfirm={confirmUpdate}
      />
    </div>
  );
}
