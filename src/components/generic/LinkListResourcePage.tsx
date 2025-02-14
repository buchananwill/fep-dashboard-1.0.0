import { EntityApiKey } from '@/api/types';
import { Api } from '@/api/clientApi';
import { LinkButtonThatJoinsList } from '@/app/core/navigation/links/LinkButtonThatJoinsList';
import { startCase } from 'lodash';
import RootCard from '@/components/generic/RootCard';
import { getRootCardLayoutId } from '@/components/work-types/getRootCardLayoutId';
import { LeafComponentProps } from '@/app/core/navigation/data/types';

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
