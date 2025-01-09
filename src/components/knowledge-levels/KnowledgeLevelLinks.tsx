import { parseTen } from '@/api/date-and-time';
import { getDtoListByExampleList as getKnowledgeLevelsByExample } from '@/api/generated-actions/KnowledgeLevel';
import { startCase } from 'lodash';
import { LinkButton } from '@/components/navigation/LinkButton';
import { getDomainAlias } from '@/api/getDomainAlias';
import { getCoreEntityLink } from '@/functions/getCoreEntityLink';

import { getRootCardLayoutId } from '@/components/work-types/getRootCardLayoutId';
import RootCard from '@/components/generic/RootCard';
import { LeafComponentProps } from '@/app/core/navigation/data/types';
import { Center, List, ListItem } from '@mantine/core';

export async function KnowledgeLevelLinks({
  depth,
  pathVariables
}: LeafComponentProps) {
  const knowledgeSeriesId = parseTen(pathVariables[depth - 1]);
  const kLevels = await getKnowledgeLevelsByExample([
    { knowledgeLevelSeriesId: knowledgeSeriesId }
  ]).then((r) => r.sort((l1, l2) => l1.levelOrdinal - l2.levelOrdinal));
  const rootCardLayoutId = getRootCardLayoutId(pathVariables);

  return (
    <RootCard
      layoutId={rootCardLayoutId}
      displayHeader={
        <Center px={'md'}>
          {startCase(getDomainAlias(pathVariables[depth - 2]))}
        </Center>
      }
    >
      <List px={'sm'} listStyleType={'none'}>
        {kLevels.map((kLevel) => (
          <ListItem key={kLevel.id}>
            <LinkButton
              href={getCoreEntityLink(pathVariables.slice(0, depth - 1), [
                knowledgeSeriesId,
                kLevel.levelOrdinal
              ])}
            >
              {kLevel.name}
            </LinkButton>
          </ListItem>
        ))}
      </List>
    </RootCard>
  );
}
