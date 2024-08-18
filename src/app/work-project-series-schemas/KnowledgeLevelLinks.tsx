import { LeafComponentProps } from '@/app/core/navigation/types';
import { parseTen } from '@/api/date-and-time';
import { getDtoListByExampleList as getKnowledgeLevelsByExample } from '@/api/generated-actions/KnowledgeLevel';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { startCase } from 'lodash';
import { LinkButton } from '@/app/service-categories/LinkButton';
import { getCoreEntityLink } from '@/app/service-categories/ServiceCategoriesHome';
import { getDomainAlias } from '@/api/getDomainAlias';

export async function KnowledgeLevelLinks({
  depth,
  pathVariables
}: LeafComponentProps) {
  const knowledgeSeriesId = parseTen(pathVariables[depth - 1]);
  const kLevels = await getKnowledgeLevelsByExample([
    { knowledgeLevelSeriesId: knowledgeSeriesId }
  ]).then((r) => r.sort((l1, l2) => l1.levelOrdinal - l2.levelOrdinal));
  return (
    <Card>
      <CardHeader>
        {startCase(getDomainAlias(pathVariables[depth - 2]))}
      </CardHeader>
      <CardBody>
        {kLevels.map((kLevel) => (
          <LinkButton
            href={getCoreEntityLink(pathVariables.slice(0, depth - 1), [
              knowledgeSeriesId,
              kLevel.levelOrdinal
            ])}
            key={kLevel.id}
          >
            {kLevel.name}
          </LinkButton>
        ))}
      </CardBody>
    </Card>
  );
}
