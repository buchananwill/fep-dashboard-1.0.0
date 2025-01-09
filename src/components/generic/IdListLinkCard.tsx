import { startCase } from 'lodash';
import { LinkButton } from '@/components/navigation/LinkButton';
import { getDomainAlias, getStartCaseDomainAlias } from '@/api/getDomainAlias';
import { getCoreEntityLink } from '@/functions/getCoreEntityLink';
import { Identifier } from 'dto-stores';
import { LeafComponentProps } from '@/app/core/navigation/data/types';
import RootCard from '@/components/generic/RootCard';
import { getRootCardLayoutId } from '@/components/work-types/getRootCardLayoutId';

export async function IdListLinkCard({
  depth,
  pathVariables,
  idList,
  entityClass
}: LeafComponentProps & { idList: Identifier[]; entityClass: string }) {
  return (
    <RootCard
      layoutId={getRootCardLayoutId(pathVariables)}
      displayHeader={startCase(getDomainAlias(pathVariables[depth - 2]))}
    >
      <div
        className={
          'center-all-margin flex flex-col items-center justify-center'
        }
      >
        {idList.map((id) => (
          <LinkButton href={getCoreEntityLink(pathVariables, [id])} key={id}>
            {getStartCaseDomainAlias(entityClass)}: {id}
          </LinkButton>
        ))}
      </div>
    </RootCard>
  );
}
