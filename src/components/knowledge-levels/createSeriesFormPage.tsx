import { LeafComponentProps } from '@/app/core/navigation/data/types';
import CreateKnowledgeLevelSeriesForm from '@/components/knowledge-levels/createKnowledgeLevelSeriesForm';
import { Api } from '@/api/clientApi';
import RootCard from '@/components/generic/RootCard';
import { getRootCardLayoutId } from '@/components/work-task-types/getRootCardLayoutId';
import { getStartCaseDomainAlias } from '@/api/getDomainAlias';
import { EntityClassMap } from '@/api/entity-class-map';
import { Center } from '@mantine/core';

export default function CreateSeriesFormPage(props: LeafComponentProps) {
  return (
    <RootCard
      layoutId={getRootCardLayoutId(props.pathVariables)}
      displayHeader={
        <Center px={'lg'}>
          New {getStartCaseDomainAlias(EntityClassMap.knowledgeLevelSeries)}
        </Center>
      }
    >
      <CreateKnowledgeLevelSeriesForm
        redirectUrl={['/core', ...props.pathVariables.slice(0, 1)].join('/')}
        createKlsAction={Api.KnowledgeLevelSeries.postOne}
      />
    </RootCard>
  );
}
