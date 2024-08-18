import * as KnowledgeLevelClient from '@/api/generated-actions/KnowledgeLevel';
import ResourceContextProvider from '@/components/providers/resource-context/ResourceContextProvider';
import { EntityClassMap } from '@/api/entity-class-map';
import KnowledgeLevelTable from '@/components/knowledge-levels/KnowledgeLevelTable';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { LeafComponentProps } from '@/app/core/navigation/types';
import PathVariableSplit from '@/components/generic/PathVariableSplit';
import { KnowledgeLevelSeriesLinks } from '@/components/knowledge-domains/KnowledgeLevelSeriesLinks';
import { Api } from '@/api/clientApi_';

async function KnowledgeLevelsTablePage({
  pathVariables,
  depth
}: LeafComponentProps) {
  const knowledgeLevelSeriesId = pathVariables[depth - 1];
  const data = await KnowledgeLevelClient.getDtoListByExampleList([
    { knowledgeLevelSeriesId: parseInt(knowledgeLevelSeriesId) }
  ]);

  const serviceCategoryDto = await Api.KnowledgeLevelSeries.getOne(
    parseInt(knowledgeLevelSeriesId)
  );

  return (
    <div className={'p-4'}>
      <ResourceContextProvider pathSegment={knowledgeLevelSeriesId}>
        <EditAddDeleteDtoControllerArray
          dtoList={data}
          entityClass={EntityClassMap.knowledgeLevel}
          updateServerAction={KnowledgeLevelClient.putList}
          deleteServerAction={KnowledgeLevelClient.deleteIdList}
          postServerAction={KnowledgeLevelClient.postList}
        />
        <KnowledgeLevelTable
          data={data}
          knowledgeLevelSeries={serviceCategoryDto}
        />
      </ResourceContextProvider>
    </div>
  );
}

export default function KnowledgeLevelsHome(props: LeafComponentProps) {
  return (
    <PathVariableSplit
      {...props}
      homeComponent={KnowledgeLevelSeriesLinks}
      subRouteComponent={KnowledgeLevelsTablePage}
    />
  );
}
