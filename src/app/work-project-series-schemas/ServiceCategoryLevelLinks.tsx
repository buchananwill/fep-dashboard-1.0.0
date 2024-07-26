import { LeafComponentProps } from '@/app/core/navigation/types';
import { parseTen } from '@/api/date-and-time';
import { getDtoListByExampleList as getKnowledgeLevelsByExample } from '@/api/generated-actions/KnowledgeLevel';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { startCase } from 'lodash';
import { LinkButton } from '@/app/service-categories/LinkButton';
import { getCoreEntityLink } from '@/app/service-categories/ServiceCategoriesHome';

export async function ServiceCategoryLevelLinks({
  depth,
  pathVariables
}: LeafComponentProps) {
  const serviceCategoryId = parseTen(pathVariables[depth - 1]);
  const kLevels = await getKnowledgeLevelsByExample([
    { serviceCategoryId: serviceCategoryId }
  ]).then((r) => r.sort((l1, l2) => l1.levelOrdinal - l2.levelOrdinal));
  return (
    <Card>
      <CardHeader>{startCase(pathVariables[depth - 2])}</CardHeader>
      <CardBody>
        {kLevels.map((kLevel) => (
          <LinkButton
            href={getCoreEntityLink(pathVariables.slice(0, depth - 1), [
              serviceCategoryId,
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