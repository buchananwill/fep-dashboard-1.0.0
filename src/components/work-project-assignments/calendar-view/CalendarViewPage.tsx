import { getEventSourcesAsKnowledgeDomains } from '@/api/actions-custom/eventSourcesAction';
import { colorizeEventSources } from '@/functions/colorizeEventSources';
import { EventSourceSimple } from '@/api/custom-types/eventSourceSimple';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types_';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import CalendarWithShowHideSources, {
  eventSourceEntityClass
} from '@/components/calendar/CalendarWithShowHideSources';
import { getLastNVariables } from '@/functions/getLastNVariables';
import { Api } from '@/api/clientApi_';
import { LinkButton } from '@/components/navigation/LinkButton';
import { getPathVariableSplitComponent } from '@/components/generic/PathVariableSplit';
import RootCard from '@/components/generic/RootCard';
import { getRootCardLayoutId } from '@/components/work-types/getRootCardLayoutId';
import { LeafComponentProps } from '@/app/core/navigation/data/types';

async function CalendarViewPage({ pathVariables }: LeafComponentProps) {
  const [scheduleId] = getLastNVariables(pathVariables, 1);
  const eventSources = await getEventSourcesAsKnowledgeDomains(
    parseInt(scheduleId)
  );
  let sourcesColorised = colorizeEventSources(
    eventSources as EventSourceSimple<KnowledgeDomainDto>[]
  );

  return (
    <div className={'p-2'}>
      <RootCard layoutId={getRootCardLayoutId(pathVariables)}>
        <div className={'h-[90vh] w-[90vw] p-2'}>
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
      </RootCard>
    </div>
  );
}

async function CalendarChooserPage({ pathVariables }: LeafComponentProps) {
  const passingSchedules = await Api.Schedule.getDtoListByExampleList([
    { status: 'PASS' }
  ]);
  return (
    <div className={'p-4'}>
      <RootCard
        layoutId={getRootCardLayoutId(pathVariables)}
        displayHeader={'Completed Schedules'}
      >
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
      </RootCard>
    </div>
  );
}

export const CalendarViewPageSplit = getPathVariableSplitComponent(
  CalendarChooserPage,
  CalendarViewPage
);
