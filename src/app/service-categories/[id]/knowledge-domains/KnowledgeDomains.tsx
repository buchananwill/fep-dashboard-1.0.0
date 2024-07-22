import {
  deleteIdList,
  getDtoListByExampleList,
  putList
} from '@/api/generated-actions/KnowledgeDomain';
import { KnowledgeDomainTable } from '@/app/service-categories/[id]/knowledge-domains/_components/KnowledgeDomainTable';
import { EntityClassMap } from '@/api/entity-class-map';
import { getOne } from '@/api/generated-actions/ServiceCategory';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { LeafComponentProps } from '@/app/core/navTree';
import PathVariableSplit from '@/app/service-categories/[id]/work-schema-nodes/PathVariableSplit';
import KnowledgeDomainSingle from '@/app/service-categories/[id]/knowledge-domains/[domainId]/KnowledgeDomainSingle';
import { Api } from '@/api/clientApi';
import {
  getCoreEntityLink,
  LinkButton
} from '@/app/service-categories/ServiceCategoriesHome';

async function Home({ pathVariables, depth }: LeafComponentProps) {
  const serviceCategoryId = pathVariables[depth - 1];
  const knowledgeDomainList = await getDtoListByExampleList([
    { serviceCategoryId: parseInt(serviceCategoryId) }
  ]);

  const serviceCategoryDto = await getOne(parseInt(serviceCategoryId));

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

async function ServiceCategoryKnowledgeDomainLinks({
  pathVariables,
  depth
}: LeafComponentProps) {
  const all = await Api.ServiceCategory.getAll();
  return all.map((serviceCategory) => (
    <LinkButton
      href={getCoreEntityLink(pathVariables[0], serviceCategory)}
      key={serviceCategory.id}
    >
      {serviceCategory.name}
    </LinkButton>
  ));
}

export default function KnowledgeDomains(props: LeafComponentProps) {
  return (
    <PathVariableSplit
      {...props}
      homeComponent={ServiceCategoryKnowledgeDomainLinks}
      subRouteComponent={KnowledgeDomainsWithServiceCategoryId}
    />
  );
}
