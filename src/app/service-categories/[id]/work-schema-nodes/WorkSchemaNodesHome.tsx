import { Api } from '@/api/clientApi';
import { Link } from '@nextui-org/link';
import { LeafComponentProps } from '@/app/core/navTree';
import WorkSchemaNodeRootGraph from '@/app/service-categories/[id]/work-schema-nodes/WorkSchemaNodeRootGraph';

export default async function WorkSchemaNodesHome({
  pathVariables,
  depth
}: LeafComponentProps) {
  if (pathVariables.length > depth + 1) {
    return (
      <WorkSchemaNodeRootGraph pathVariables={pathVariables} depth={depth} />
    );
  }
  const rootNodeList = await Api.WorkSchemaNode.getRootNodeList();

  return (
    <div className={'flex flex-col gap-2'}>
      {rootNodeList.map((node) => (
        <Link key={node.id} href={`/core/work-schema-nodes/${node.id}`}>
          {node.name ?? `Work Schema Node: ${node.id}`}
        </Link>
      ))}
    </div>
  );
}
