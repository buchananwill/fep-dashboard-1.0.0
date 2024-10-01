import { EntityApiKey } from '@/api/types';
import { Api } from '@/api/clientApi_';
import { LinkButtonThatJoinsList } from '@/app/core/navigation/LinkButtonThatJoinsList';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { startCase } from 'lodash';
import RootCard from '@/app/core/navigation/RootCard';
import { getRootCardLayoutId } from '@/components/work-task-types/getRootCardLayoutId';

export async function LinkListResourcePage({
  entityClass,
  pathVariables
}: {
  entityClass: EntityApiKey;
} & LeafComponentProps) {
  const idList = await Api[entityClass].getIdList();

  return (
    <>
      <div className={'p-4'}>
        <RootCard layoutId={getRootCardLayoutId(pathVariables)}>
          {idList.map((id) => {
            const linkList = ['core', ...pathVariables, String(id)];
            return (
              <LinkButtonThatJoinsList
                key={id}
                link={linkList}
                displayLabel={`${startCase(entityClass)}: ${id}`}
              />
            );
          })}
        </RootCard>
      </div>
    </>
  );
}
