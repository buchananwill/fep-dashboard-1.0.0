import CalendarViewer from '@/components/calendar/FullCalendar';
import { assetPostRequests } from '@/utils/init-json-data/arts-college/dataToTransform';

export default function page() {
  return (
    <div className={'h-[20vh] w-[40vw]'}>
      {/*<div className={'border-2 '}>{JSON.stringify(assetPostRequests)}</div>*/}
      <CalendarViewer />

      {/*<JsonTree data={enrollmentGraph} />*/}
      {/*<JsonTree data={teachersCrossProduct} />*/}
    </div>
  );
}
