'use client';
import CalendarViewer from '@/components/calendar/full-calendar/FullCalendar';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types_';
import CheckBoxEntity from '@/components/generic/checkbox-group-entity/CheckBoxEntity';
import { NamespacedHooks, useLazyDtoListListener } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/client-literals';
import { useMemo } from 'react';
import { flattenTimesIntoEvent } from '@/components/calendar/full-calendar/flattenTimesIntoEvent';
import { EventSourceSimple } from '@/api/custom-types/eventSourceSimple';
import { ScrollArea } from '@mantine/core';

export const eventSourceEntityClass = 'eventSource';
export default function CalendarWithShowHideSources() {
  let { currentState: selectedSourceIdList } = NamespacedHooks.useListen(
    eventSourceEntityClass,
    KEY_TYPES.SELECTED,
    'calendar',
    EmptyArray
  );
  let { currentState } = useLazyDtoListListener<
    EventSourceSimple<KnowledgeDomainDto>
  >(selectedSourceIdList, eventSourceEntityClass);

  const sourcesFlattened = useMemo(() => {
    return [...currentState.values()].map((source) => {
      return {
        ...source,
        events: source.events.map((event) => flattenTimesIntoEvent(event))
      };
    });
  }, [currentState]);

  return (
    <div className={'flex h-[85vh] w-full justify-center gap-2'}>
      <ScrollArea classNames={{ root: 'border-4 rounded-xl p-2' }}>
        <div className={'flex h-fit flex-col rounded-xl '}>
          <CheckBoxEntity<number, EventSourceSimple<KnowledgeDomainDto>>
            entityClass={eventSourceEntityClass}
            labelAccessor={(kd) => kd.sourceData.name}
            colorAccessor={(kdSource) => kdSource.color ?? 'dodgerblue'}
          />
        </div>
      </ScrollArea>

      <div className={'h-full grow p-4'}>
        <CalendarViewer eventSources={sourcesFlattened} />
      </div>
    </div>
  );
}
