import { EntityClassMap } from '@/api/entity-class-map';
import WpssEditGridColList from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/_components/WpssEditGridColList';
import { workProjectSeriesSchemaActionSequence } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/_functions/workProjectSeriesSchemaActionSequence';
import { ServiceCategoryRouteParams } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/serviceCategoryRouteParams';
import { EditAddDeleteDtoControllerArray } from 'dto-stores';
import {
  deleteIdList,
  postList,
  putList
} from '@/api/generated-actions/WorkProjectSeriesSchema';

export default async function Page({
  params: { id, levelOrdinal }
}: {
  params: ServiceCategoryRouteParams;
}) {
  const { workProjectSeriesSchemas: wpssData } =
    await workProjectSeriesSchemaActionSequence({
      levelOrdinal: parseInt(levelOrdinal),
      serviceCategoryId: parseInt(id)
    });

  return (
    <>
      <EditAddDeleteDtoControllerArray
        dtoList={wpssData}
        entityClass={EntityClassMap.workProjectSeriesSchema}
        updateServerAction={putList}
        deleteServerAction={deleteIdList}
        postServerAction={postList}
      />
      <WpssEditGridColList />
    </>
  );
}
