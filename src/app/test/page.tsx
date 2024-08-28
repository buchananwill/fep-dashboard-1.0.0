import { assetRoles } from '@/utils/init-json-data/arts-college/assetRoles';

export default function page() {
  return (
    <>
      <div className={'border-2 '}>{JSON.stringify(assetRoles)}</div>

      {/*<JsonTree data={enrollmentGraph} />*/}
      {/*<JsonTree data={teachersCrossProduct} />*/}
    </>
  );
}
