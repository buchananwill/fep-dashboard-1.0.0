import { allProviders } from '@/utils/init-json-data/arts-college/providerPostRequests_v2';

export default function page() {
  return (
    <>
      <div className={'border-2 '}>{JSON.stringify(allProviders)}</div>

      {/*<JsonTree data={reAccumulatedTeachers} />*/}
      {/*<JsonTree data={teachersCrossProduct} />*/}
    </>
  );
}
