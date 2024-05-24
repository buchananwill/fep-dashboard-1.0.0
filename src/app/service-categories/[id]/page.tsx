import { DtoController } from 'dto-stores/dist/controllers/DtoController';
import { EntityClassMap } from '@/api/entity-class-map';
import ServiceCategoryCard from '@/app/service-categories/components/ServiceCategoryCard';
import DtoIdListChangesTracker from '@/components/generic/DtoChangesTracker';
import {
  deleteIdList,
  getOne,
  putList
} from '@/api/generated-actions/ServiceCategory';
import { EditAddDeleteController } from 'dto-stores';

export default async function Page({
  params: { id }
}: {
  params: { id: string };
}) {
  let data = await getOne(parseInt(id));

  return (
    <>
      <EditAddDeleteController
        entityClass={EntityClassMap.serviceCategory}
        updateServerAction={putList}
        deleteServerAction={deleteIdList}
      />
      <DtoController dto={data} entityClass={EntityClassMap.serviceCategory} />
      <ServiceCategoryCard id={data.id} />
    </>
  );
}
