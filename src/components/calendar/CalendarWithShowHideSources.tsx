'use client';
import CalendarViewer from '@/components/calendar/full-calendar/FullCalendar';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types';
import CheckBoxEntity from '@/app/test/checkbox-group-entity/CheckBoxEntity';
import { NamespacedHooks, useLazyDtoListListener } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { useMemo } from 'react';
import { flattenTimesIntoEvent } from '@/components/calendar/full-calendar/flattenTimesIntoEvent';
import { EventSourceSimple } from '@/api/custom-types/eventSourceSimple';
import { Card } from '@nextui-org/card';
import { ScrollShadow } from '@nextui-org/scroll-shadow';

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
      <Card
      // className={'flex h-full overflow-hidden rounded-xl border-4'}
      >
        <ScrollShadow className={' flex flex-col gap-2 overflow-auto p-2 px-3'}>
          <CheckBoxEntity<number, EventSourceSimple<KnowledgeDomainDto>>
            entityClass={eventSourceEntityClass}
            labelAccessor={(kd) => kd.sourceData.name}
            colorAccessor={(kdSource) => kdSource.color ?? 'dodgerblue'}
          />
        </ScrollShadow>
      </Card>
      <Card className={'h-full grow p-4'}>
        <CalendarViewer eventSources={sourcesFlattened} />
      </Card>
    </div>
  );
}
