import CalendarViewer from '@/components/calendar/FullCalendar';
import { eventsWithDates } from '@/app/test/eventsTest';

export default function page() {
  return (
    <div className={'h-[20vh] w-[40vw]'}>
      {/*<div className={'border-2 '}>{JSON.stringify(assetPostRequests)}</div>*/}
      <CalendarViewer events={eventsWithDates} />

      {/*<JsonTree data={enrollmentGraph} />*/}
      {/*<JsonTree data={teachersCrossProduct} />*/}
    </div>
  );
}
