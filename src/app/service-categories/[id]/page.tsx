import {
  deleteIdList,
  getOne,
  putList
} from '@/app/api/generated-actions/ServiceCategory';
import { MissingData } from '@/components/generic/MissingData';
import { DtoController } from 'dto-stores/dist/controllers/DtoController';
import { EntityClassMap } from '@/app/api/entity-class-map';
import ServiceCategoryCard from '@/app/service-categories/components/ServiceCategoryCard';
import DtoChangesTracker from '@/components/generic/DtoChangesTracker';

export default async function Page({
  params: { id }
}: {
  params: { id: string };
}) {
  let actionResponse = await getOne(parseInt(id));

  if (actionResponse.data === undefined) return <MissingData />;

  const data = actionResponse.data;

  return (
    <>
      <DtoChangesTracker
        dtoList={[data]}
        entityName={EntityClassMap.serviceCategory}
        updateServerAction={putList}
        deleteServerAction={deleteIdList}
      />
      <DtoController dto={data} entityName={EntityClassMap.serviceCategory} />
      <ServiceCategoryCard id={data.id} />
    </>
  );
}
