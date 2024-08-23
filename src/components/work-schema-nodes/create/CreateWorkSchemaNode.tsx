import WorkSchemaNodeGraph from '@/components/work-schema-nodes/_components/WorkSchemaNodeGraph';
import { workSchemaNodeForceGraphOptions } from '@/components/work-schema-nodes/workSchemaNodeForceGraphOptions';
import { EmptyArray } from '@/api/literals';
import { Api } from '@/api/clientApi_';
import { getWithoutBody } from '@/api/actions/template-actions';
import { WorkSchemaNodeDto } from '@/api/zod-schemas/WorkSchemaNodeDtoSchema_';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import { DataLink, DataNode } from 'react-d3-force-wrapper';

export default async function CreateWorkSchemaNode() {
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