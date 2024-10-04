import { Api } from '@/api/clientApi_';
import WorkSchemaNodeRootGraph from '@/components/work-schema-nodes/WorkSchemaNodeRootGraph';
import PathVariableSplit from '@/components/generic/PathVariableSplit';
import { LinkButton } from '@/components/navigation/LinkButton';
import { chunk, sortBy } from 'lodash';
import RootCard from '@/components/generic/RootCard';
import { getRootCardLayoutId } from '@/components/work-task-types/getRootCardLayoutId';
import { LeafComponentProps } from '@/app/core/navigation/data/types';

const DESIRED_COLUMN_NUMBER = 3;

async function Home({ pathVariables }: LeafComponentProps) {
  const rootNodeList = await Api.WorkSchemaNode.getRootNodeList();
  const sortedByNameThenId = sortBy(rootNodeList, [
    (node) => node.name,
    (node) => node.id
  ]);
  const chunkSize = Math.ceil(
    sortedByNameThenId.length / DESIRED_COLUMN_NUMBER
  );

  const arrays = chunk(sortedByNameThenId, chunkSize);

  console.log({ chunkSize, arrays });
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
