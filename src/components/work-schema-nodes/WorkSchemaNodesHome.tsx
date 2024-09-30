import { Api } from '@/api/clientApi_';
import { LeafComponentProps } from '@/app/core/navigation/types';
import WorkSchemaNodeRootGraph from '@/components/work-schema-nodes/WorkSchemaNodeRootGraph';
import PathVariableSplit from '@/components/generic/PathVariableSplit';
import { LinkButton } from '@/components/navigation/LinkButton';

async function Home({ pathVariables }: LeafComponentProps) {
  const rootNodeList = await Api.WorkSchemaNode.getRootNodeList();

  return (
    <div className={'flex flex-col gap-2'}>
      {rootNodeList.map((node) => (
        <LinkButton
          key={node.id}
          href={`/core/${pathVariables.join('/')}/${node.id}`}
        >
          {node.name ?? `Work Schema Node: ${node.id}`}
        </LinkButton>
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
