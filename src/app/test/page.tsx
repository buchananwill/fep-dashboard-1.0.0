import CalendarViewer from '@/components/calendar/FullCalendar';
import { eventsWithDates } from '@/app/test/eventsTest';
import { sourcesColorised } from '@/app/test/eventSourcesTest';

export default function page() {
  return (
    <div className={'w-[60vw]'}>
      {/*<div className={'border-2 '}>{JSON.stringify(assetPostRequests)}</div>*/}
      <CalendarViewer eventSources={sourcesColorised} />

      {/*<JsonTree data={enrollmentGraph} />*/}
      {/*<JsonTree data={teachersCrossProduct} />*/}
    </div>
  );
}
