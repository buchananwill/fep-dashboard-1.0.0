import { getEventSourcesAsKnowledgeDomains } from '@/api/actions-custom/eventSourcesAction';
import { colorizeEventSources } from '@/functions/colorizeEventSources';
import { EventSourceSimple } from '@/api/custom-types/eventSourceSimple';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import CalendarWithShowHideSources, {
  eventSourceEntityClass
} from '@/components/calendar/CalendarWithShowHideSources';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { getLastNVariables } from '@/functions/getLastNVariables';
import { Api } from '@/api/clientApi_';
import { LinkButton } from '@/components/navigation/LinkButton';
import { getPathVariableSplitComponent } from '@/components/generic/PathVariableSplit';
import SendEventsButton from '@/components/calendar/CreateEventButton';
import PurgeEventsButton from '@/components/calendar/PurgeEventsButton';

async function CalendarViewPage({ pathVariables }: LeafComponentProps) {
  const [scheduleId] = getLastNVariables(pathVariables, 1);
  const eventSources = await getEventSourcesAsKnowledgeDomains(
    parseInt(scheduleId)
  );
  let sourcesColorised = colorizeEventSources(
    eventSources as EventSourceSimple<KnowledgeDomainDto>[]
  );

  return (
    <div className={'h-[95vh] w-[95vw] overflow-clip p-4'}>
      <EditAddDeleteDtoControllerArray
        entityClass={eventSourceEntityClass}
        dtoList={sourcesColorised}
      />
      {/*<div className={'flex gap-2'}>*/}
      {/*  <SendEventsButton />*/}
      {/*  <PurgeEventsButton />*/}
      {/*</div>*/}
      <CalendarWithShowHideSources />
    </div>
  );
}

async function CalendarChooserPage({}: LeafComponentProps) {
  const passingSchedules = await Api.Schedule.getDtoListByExampleList([
    { status: 'PASS' }
  ]);
  return (
    <>
      <h1>Completed Schedules</h1>
      <div className={'flex flex-col'}>
        {passingSchedules.map((passingSchedule) => (
          <LinkButton
            href={`/core/schedules/calendar-view/${passingSchedule.id}`}
            key={passingSchedule.id}
          >
            Schedule {passingSchedule.id}
          </LinkButton>
        ))}
      </div>
    </>
  );
}

export const CalendarViewPageSplit = getPathVariableSplitComponent(
  CalendarChooserPage,
  CalendarViewPage
);
