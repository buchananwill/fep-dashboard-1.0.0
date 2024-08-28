import { assetPostRequests } from '@/utils/init-json-data/arts-college/dataToTransform';

export default function page() {
  return (
    <>
      <div className={'border-2 '}>{JSON.stringify(assetPostRequests)}</div>

      {/*<JsonTree data={enrollmentGraph} />*/}
      {/*<JsonTree data={teachersCrossProduct} />*/}
    </>
  );
}
