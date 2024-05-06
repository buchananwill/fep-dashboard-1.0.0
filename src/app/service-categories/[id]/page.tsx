import {
  deleteIdList,
  getOne,
  putList
} from '@/app/api/generated-actions/ServiceCategory';
import { DtoController } from 'dto-stores/dist/controllers/DtoController';
import { EntityClassMap } from '@/api/entity-class-map';
import ServiceCategoryCard from '@/app/service-categories/components/ServiceCategoryCard';
import DtoIdListChangesTracker from '@/components/generic/DtoChangesTracker';
import NameAccessorContextProvider from '@/components/providers/text-accessor-context/NameAccessorContextProvider';

export default async function Page({
  params: { id }
}: {
  params: { id: string };
}) {
  let data = await getOne(parseInt(id));

  return (
    <>
      <DtoIdListChangesTracker
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
