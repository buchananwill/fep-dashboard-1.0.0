import { EntityClassMap } from '@/api/entity-class-map';
import ServiceCategoryCard from '@/app/service-categories/_components/ServiceCategoryCard';
import {
  deleteIdList,
  getOne,
  putList
} from '@/api/generated-actions/ServiceCategory';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';

export default async function Page({
  params: { id }
}: {
  params: { id: string };
}) {
  let data = await getOne(parseInt(id));

  return (
    <>
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.serviceCategory}
        dtoList={[data]}
        updateServerAction={putList}
        deleteServerAction={deleteIdList}
      />
      <ServiceCategoryCard id={data.id} />
    </>
  );
}
