import { Api } from '@/api/clientApi_';
import { Link } from '@nextui-org/link';
import { LeafComponentProps } from '@/app/core/navigation/types';
import WorkSchemaNodeRootGraph from '@/app/service-categories/[id]/work-schema-nodes/WorkSchemaNodeRootGraph';
import PathVariableSplit from '@/app/service-categories/[id]/work-schema-nodes/PathVariableSplit';

async function Home({}: LeafComponentProps) {
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

export default function WorkSchemaNodesHome(props: LeafComponentProps) {
  return (
    <PathVariableSplit
      {...props}
      homeComponent={Home}
      subRouteComponent={WorkSchemaNodeRootGraph}
    />
  );
}
