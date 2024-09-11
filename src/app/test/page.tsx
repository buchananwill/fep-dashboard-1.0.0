import { getEventSourcesAsKnowledgeDomains } from '@/components/calendar/eventSourcesAction';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types';
import CalendarWithShowHideSources, {
  eventSourceEntityClass
} from '@/components/calendar/CalendarWithShowHideSources';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import CreateEventButton from '@/components/calendar/CreateEventButton';
import { EventSourceSimple } from '@/components/calendar/eventSourceSimple';
import { colorizeEventSources } from '@/components/calendar/colorizeEventSources';

export default async function page() {
  const eventSources = await getEventSourcesAsKnowledgeDomains(1);
  let sourcesColorised = colorizeEventSources(
    eventSources as EventSourceSimple<KnowledgeDomainDto>[]
    // .filter((source) => oneToOneSubjects.includes(source.sourceData.name))
  );
  console.log(sourcesColorised);
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
