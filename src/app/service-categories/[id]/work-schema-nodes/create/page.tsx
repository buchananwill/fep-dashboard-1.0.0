import WorkSchemaNodeGraph from '@/app/service-categories/[id]/work-schema-nodes/_components/WorkSchemaNodeGraph';
import { workSchemaNodeForceGraphOptions } from '@/app/service-categories/[id]/work-schema-nodes/[rootNodeId]/workSchemaNodeForceGraphOptions';
import { EmptyArray } from '@/api/literals';
import { Api } from '@/api/clientApi';
import { getWithoutBody } from '@/api/actions/template-actions';
import { WorkSchemaNodeDto } from '@/api/dtos/WorkSchemaNodeDtoSchema';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { DataLink, DataNode } from 'react-d3-force-wrapper';

export default async function page() {
  const schemas = await Api.WorkProjectSeriesSchema.getAll();

  const unassignedRootList = await getWithoutBody<WorkSchemaNodeDto[]>(
    constructUrl('/api/v2/workSchemaNode/rootNodesWithNoAssignments')
  );
  return (
    <WorkSchemaNodeGraph
      forceGraphPageProps={{
        graphName: 'createWorkSchemaNode',
        options: workSchemaNodeForceGraphOptions,
        dataLinks: EmptyArray as DataLink<WorkSchemaNodeDto>[],
        dataNodes: EmptyArray as DataNode<WorkSchemaNodeDto>[]
      }}
      schemas={schemas}
      unassignedRootList={unassignedRootList}
    />
  );
}
