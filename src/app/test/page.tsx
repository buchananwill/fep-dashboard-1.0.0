import { getEventSourcesAsKnowledgeDomains } from '@/api/actions-custom/eventSourcesAction';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types';
import CalendarWithShowHideSources, {
  eventSourceEntityClass
} from '@/components/calendar/CalendarWithShowHideSources';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import CreateEventButton from '@/components/calendar/CreateEventButton';
import { EventSourceSimple } from '@/api/custom-types/eventSourceSimple';
import { colorizeEventSources } from '@/functions/colorizeEventSources';

export default async function page() {
  const eventSources = await getEventSourcesAsKnowledgeDomains(1);
  let sourcesColorised = colorizeEventSources(
    eventSources as EventSourceSimple<KnowledgeDomainDto>[]
    // .filter((source) => oneToOneSubjects.includes(source.sourceData.name))
  );

  return (
    <div className={'h-[95vh] w-[95vw]'}>
      <EditAddDeleteDtoControllerArray
        entityClass={eventSourceEntityClass}
        dtoList={sourcesColorised}
      />
      <CreateEventButton />
      {/*<div className={'border-2 '}>{JSON.stringify(assetPostRequests)}</div>*/}
      <CalendarWithShowHideSources sources={sourcesColorised} />
      {/*<JsonTree data={enrollmentGraph} />*/}
      {/*<JsonTree data={teachersCrossProduct} />*/}
    </div>
  );
}

const oneToOneSubjects = [
  'Jazz/Pop Voice',
  'Piano',
  'Classical Voice',
  'Pop Guitar',
  'Drum Kit',
  'Production',
  'French Horn',
  'Double Bass',
  'Guitar'
];
