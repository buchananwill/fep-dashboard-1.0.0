import { normalizeIds } from '@/components/work-schema-nodes/nivo-sunburst-chart/normalizeIds';
import { OneToOneEnrollments } from '@/utils/init-json-data/arts-college/enrollments';
import { addLeaves } from '@/utils/init-json-data/arts-college/addLeaves';
import JsonTree from '@/components/generic/JsonTree';

export default function page() {
  const withLeaves = structuredClone(OneToOneEnrollments);
  addLeaves(withLeaves, 4);

  return (
    <>
      <div className={'border-2 '}>{JSON.stringify(withLeaves)}</div>
      <JsonTree data={withLeaves} />
      <JsonTree data={OneToOneEnrollments} />
      {/*<JsonTree data={reAccumulatedTeachers} />*/}
      {/*<JsonTree data={teachersCrossProduct} />*/}
    </>
  );
}
