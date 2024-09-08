'use client';
import CalendarViewer from '@/components/calendar/FullCalendar';
import { EventSourceSimple } from '@/app/test/eventSourcesTest';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types';
import CheckBoxEntity from '@/app/test/checkbox-group-entity/CheckBoxEntity';
import { NamespacedHooks, useLazyDtoListListener } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';

export const eventSourceEntityClass = 'eventSource';
export default function CalendarWithShowHideSources({
  sources
}: {
  sources: EventSourceSimple<KnowledgeDomainDto>[];
}) {
  let { currentState: selectedSourceIdList } = NamespacedHooks.useListen(
    eventSourceEntityClass,
    KEY_TYPES.SELECTED,
    'calendar',
    EmptyArray
  );
  let { currentState } = useLazyDtoListListener<
    EventSourceSimple<KnowledgeDomainDto>
  >(selectedSourceIdList, eventSourceEntityClass);
  console.log([...currentState.values()]);
  return (
    <div className={'flex w-full'}>
      <div className={'flex flex-col gap-2'}>
        <CheckBoxEntity<number, EventSourceSimple<KnowledgeDomainDto>>
          entityClass={eventSourceEntityClass}
          labelAccessor={(kd) => kd.sourceData.name}
        />
      </div>
      <div className={'w-[50vw]'}>
        <CalendarViewer eventSources={[...currentState.values()]} />
      </div>
    </div>
  );
}
