import WorkSchemaNodeGraph from '@/components/work-schema-nodes/_components/WorkSchemaNodeGraph';
import { workSchemaNodeForceGraphOptions } from '@/components/work-schema-nodes/workSchemaNodeForceGraphOptions';
import { EmptyArray } from '@/api/client-literals';
import { Api } from '@/api/clientApi_';
import { getWithoutBody } from '@/api/actions/template-actions';
import { WorkSchemaNodeDto } from '@/api/generated-types/generated-types_';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { DataLink, DataNode } from 'react-d3-force-wrapper';

export default async function CreateWorkSchemaNode() {
  const unassignedRootList = await getWithoutBody<WorkSchemaNodeDto[]>(
    constructUrl('/api/v2/workSchemaNodes/rootNodesWithNoAssignments')
  );
  return (
    <WorkSchemaNodeGraph
      forceGraphPageProps={{
        graphName: 'createWorkSchemaNode',
        options: workSchemaNodeForceGraphOptions,
        dataLinks: EmptyArray as DataLink<WorkSchemaNodeDto>[],
        dataNodes: EmptyArray as DataNode<WorkSchemaNodeDto>[]
      }}
      unassignedRootList={unassignedRootList}
    />
  );
}
