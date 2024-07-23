import { EntityClassMap } from '@/api/entity-class-map';
import ServiceCategoryCard from '@/app/service-categories/_components/ServiceCategoryCard';
import {
  deleteIdList,
  getOne,
  putList
} from '@/api/generated-actions/ServiceCategory';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import { LeafComponentProps } from '@/app/core/navigation/types';

export default async function ServiceCategory({
  pathVariables,
  depth
}: LeafComponentProps) {
  let data = await getOne(parseInt(pathVariables[depth - 1]));

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
