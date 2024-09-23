import { LeafComponentProps } from '@/app/core/navigation/types';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { startCase } from 'lodash';
import { LinkButton } from '@/components/navigation/LinkButton';
import { getDomainAlias, getStartCaseDomainAlias } from '@/api/getDomainAlias';
import { getCoreEntityLink } from '@/functions/getCoreEntityLink';
import { Identifier } from 'dto-stores';

export async function IdListLinkCard({
  depth,
  pathVariables,
  idList,
  entityClass
}: LeafComponentProps & { idList: Identifier[]; entityClass: string }) {
  return (
    <Card>
      <CardHeader>
        {startCase(getDomainAlias(pathVariables[depth - 2]))}
      </CardHeader>
      <CardBody>
        {idList.map((id) => (
          <LinkButton href={getCoreEntityLink(pathVariables, [id])} key={id}>
            {getStartCaseDomainAlias(entityClass)}: {id}
          </LinkButton>
        ))}
      </CardBody>
    </Card>
  );
}
