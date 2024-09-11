import { getEventSourcesAsKnowledgeDomains } from '@/components/calendar/eventSourcesAction';
import { colorizeEventSources } from '@/components/calendar/colorizeEventSources';
import { EventSourceSimple } from '@/components/calendar/eventSourceSimple';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import CalendarWithShowHideSources, {
  eventSourceEntityClass
} from '@/components/calendar/CalendarWithShowHideSources';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { getLastNVariables } from '@/app/work-project-series-schemas/getLastNVariables';
import { Api } from '@/api/clientApi_';
import { LinkButton } from '@/app/service-categories/LinkButton';
import { getPathVariableSplitComponent } from '@/components/generic/PathVariableSplit';

async function CalendarViewPage({ pathVariables }: LeafComponentProps) {
  const [scheduleId] = getLastNVariables(pathVariables, 1);
  const eventSources = await getEventSourcesAsKnowledgeDomains(
    parseInt(scheduleId)
  );
  let sourcesColorised = colorizeEventSources(
    eventSources as EventSourceSimple<KnowledgeDomainDto>[]
  );
  console.log(sourcesColorised);
  return (
    <div className={'h-[95vh] w-[95vw]'}>
      <EditAddDeleteDtoControllerArray
        entityClass={eventSourceEntityClass}
        dtoList={sourcesColorised}
      />
      <CalendarWithShowHideSources sources={sourcesColorised} />
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
