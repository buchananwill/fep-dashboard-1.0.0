import { Api } from '@/api/clientApi_';
import { LeafComponentProps } from '@/app/core/navigation/types';
import WorkSchemaNodeRootGraph from '@/components/work-schema-nodes/WorkSchemaNodeRootGraph';
import PathVariableSplit from '@/components/generic/PathVariableSplit';
import { LinkButton } from '@/components/navigation/LinkButton';
import { chunk, sortBy } from 'lodash';
import RootCard from '@/app/core/navigation/RootCard';
import { getRootCardLayoutId } from '@/components/work-task-types/getRootCardLayoutId';

const DESIRED_COLUMN_NUMBER = 3;

async function Home({ pathVariables }: LeafComponentProps) {
  const rootNodeList = await Api.WorkSchemaNode.getRootNodeList();
  const sortedByNameThenId = sortBy(rootNodeList, [
    (node) => node.name,
    (node) => node.id
  ]);
  const chunkSize = Math.round(
    sortedByNameThenId.length / DESIRED_COLUMN_NUMBER
  );
  const arrays = chunk(sortedByNameThenId, chunkSize);

  return (
    <div className={'p-4'}>
      <RootCard layoutId={getRootCardLayoutId(pathVariables)}>
        <div className={'grid grid-cols-3 gap-4'}>
          {arrays.map((list, index) => (
            <div
              key={index}
              className={'flex flex-col gap-2  rounded-large shadow-small'}
            >
              {list.map((node) => {
                return (
                  <LinkButton
                    href={`/core/${pathVariables.join('/')}/${node.id}`}
                    key={node.id}
                  >
                    {node.name ?? `Work Schema Node: ${node.id}`}
                  </LinkButton>
                );
              })}
            </div>
          ))}
        </div>
      </RootCard>
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
