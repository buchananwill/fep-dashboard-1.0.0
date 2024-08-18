import {
  deleteIdList,
  getDtoListByExampleList,
  putList
} from '@/api/generated-actions/KnowledgeDomain';
import { KnowledgeDomainTable } from '@/components/knowledge-domains/KnowledgeDomainTable';
import { EntityClassMap } from '@/api/entity-class-map';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { LeafComponentProps } from '@/app/core/navigation/types';
import PathVariableSplit from '@/app/service-categories/[id]/work-schema-nodes/PathVariableSplit';
import KnowledgeDomainSingle from '@/components/knowledge-domains/KnowledgeDomainSingle';
import { KnowledgeLevelSeriesLinks } from '@/components/knowledge-domains/KnowledgeLevelSeriesLinks';
import { Api } from '@/api/clientApi_';

async function Home({ pathVariables, depth }: LeafComponentProps) {
  const serviceCategoryId = pathVariables[depth - 1];
  const knowledgeDomainList = await getDtoListByExampleList([
    { serviceCategoryId: parseInt(serviceCategoryId) }
  ]);

  const serviceCategoryDto = await Api.KnowledgeLevelSeries.getOne(
    parseInt(serviceCategoryId)
  );

  return (
    <div className={'p-4'}>
      <EditAddDeleteDtoControllerArray
        dtoList={knowledgeDomainList}
        entityClass={EntityClassMap.knowledgeDomain}
        updateServerAction={putList}
        deleteServerAction={deleteIdList}
      />
      <KnowledgeDomainTable
        data={knowledgeDomainList}
        serviceCategory={serviceCategoryDto}
      />
    </div>
  );
}

function KnowledgeDomainsWithServiceCategoryId(props: LeafComponentProps) {
  return (
    <PathVariableSplit
      homeComponent={Home}
      subRouteComponent={KnowledgeDomainSingle}
      {...props}
    />
  );
}

export default function KnowledgeDomains(props: LeafComponentProps) {
  return (
    <PathVariableSplit
      {...props}
      homeComponent={KnowledgeLevelSeriesLinks}
      subRouteComponent={KnowledgeDomainsWithServiceCategoryId}
    />
  );
}
