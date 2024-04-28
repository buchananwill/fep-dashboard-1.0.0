import { EntityClassMap } from '@/app/api/entity-class-map';
import { DtoListChangesTracker } from '@/components/generic/DtoChangesTracker';
import WpssEditGridColList from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/components/WpssEditGridColList';
import { workProjectSeriesSchemaActionSequence } from '@/utils/data-fetching/workProjectSeriesSchemaActionSequence';
import { ServiceCategoryRouteParams } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/serviceCategoryRouteParams';

export default async function Page({
  params: { serviceCategoryId, levelOrdinal }
}: {
  params: ServiceCategoryRouteParams;
}) {
  const { workProjectSeriesSchemas: wpssData } =
    await workProjectSeriesSchemaActionSequence({
      levelOrdinal: parseInt(levelOrdinal),
      serviceCategoryId: parseInt(serviceCategoryId)
    });

  return (
    <>
      <DtoListChangesTracker
        dtoList={wpssData}
        entityName={EntityClassMap.workProjectSeriesSchema}
      />
      <WpssEditGridColList />
    </>
  );
}
