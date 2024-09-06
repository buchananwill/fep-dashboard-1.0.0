import {
  colorizeEventSources,
  EventSourceSimple
} from '@/app/test/eventSourcesTest';
import { getEventSourcesAsKnowledgeDomains } from '@/app/test/eventSourcesAction';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types';
import CalendarWithShowHideSources, {
  eventSourceEntityClass
} from '@/app/test/CalendarWithShowHideSources';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { graphClient } from '@/components/microsoft-graph/graphClient';
import CreateEventButton from '@/app/test/CreateEventButton';

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
