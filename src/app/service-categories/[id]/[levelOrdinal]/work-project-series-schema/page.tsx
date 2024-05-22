import { EntityClassMap } from '@/api/entity-class-map';
import { DtoControllerArrayChangesTracker } from '@/components/generic/DtoChangesTracker';
import WpssEditGridColList from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/components/WpssEditGridColList';
import { workProjectSeriesSchemaActionSequence } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/functions/workProjectSeriesSchemaActionSequence';
import { ServiceCategoryRouteParams } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/serviceCategoryRouteParams';

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
      <DtoControllerArrayChangesTracker
        dtoList={wpssData}
        entityClass={EntityClassMap.workProjectSeriesSchema}
      />
      <WpssEditGridColList />
    </>
  );
}
