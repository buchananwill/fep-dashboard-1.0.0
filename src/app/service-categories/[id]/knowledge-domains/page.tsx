import {
  deleteIdList,
  getDtoListByExampleList,
  putList
} from '@/app/api/generated-actions/KnowledgeDomain';
import { MissingData } from '@/components/generic/MissingData';
import ResourceContextProvider from '@/components/providers/resource-context/ResourceContextProvider';
import { KnowledgeDomainTable } from '@/app/service-categories/[id]/knowledge-domains/components/KnowledgeDomainTable';
import { EntityNamesMap } from '@/app/api/entity-names-map';
import { DtoListChangesTracker } from '@/components/generic/DtoChangesTracker';
import { getOne } from '@/app/api/generated-actions/ServiceCategory';

const columns = [{ name: '' }];

export default async function Page({
  params: { id }
}: {
  params: { id: string };
}) {
  const actionResponse = await getDtoListByExampleList([
    { serviceCategoryId: parseInt(id) }
  ]);

  const serCatResp = await getOne(parseInt(id));

  const data = actionResponse.data;
  const serviceCategoryDto = serCatResp.data;
  if (data === undefined || serviceCategoryDto === undefined)
    return <MissingData response={actionResponse} />;

  return (
    <div className={'p-4'}>
      <ResourceContextProvider pathSegment={id}>
        <DtoListChangesTracker
          dtoList={data}
          entityName={EntityNamesMap.knowledgeDomain}
          updateServerAction={putList}
          deleteServerAction={deleteIdList}
        />
        <KnowledgeDomainTable
          data={data}
          serviceCategory={serviceCategoryDto}
        />
      </ResourceContextProvider>
    </div>
  );
}
