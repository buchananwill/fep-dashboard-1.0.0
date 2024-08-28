import { allProviders } from '@/utils/init-json-data/arts-college/providerPostRequests_v2';
import { enrollmentGraph } from '@/utils/init-json-data/arts-college/enrollment-graph';
import JsonTree from '@/components/generic/JsonTree';

export default function page() {
  enrollmentGraph.nodes
    .filter((node) => node.id > 14)
    .forEach((node) => {
      node.data.name = `Student ${node.id - 14}`;
    });

  return (
    <>
      <div className={'border-2 '}>{JSON.stringify(enrollmentGraph)}</div>

      {/*<JsonTree data={enrollmentGraph} />*/}
      {/*<JsonTree data={teachersCrossProduct} />*/}
    </>
  );
}
