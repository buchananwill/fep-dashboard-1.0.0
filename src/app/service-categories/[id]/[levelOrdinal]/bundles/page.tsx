import { getDtoListByExampleList as getSchemaBundleByExampleList } from '@/app/api/generated-actions/WorkSeriesSchemaBundle';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import AllBundlesTotal from '@/app/service-categories/[id]/[levelOrdinal]/bundles/components/AllBundlesTotal';
import WorkSeriesSchemaBundleTabGroup from '@/app/service-categories/[id]/[levelOrdinal]/bundles/components/WorkSeriesSchemaBundleTabGroup';
import { EntityClassMap } from '@/app/api/entity-class-map';
import { ServiceCategoryRouteParams } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/serviceCategoryRouteParams';
import { getLevelPartialAndSchemaList } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/functions/getLevelPartialAndSchemaList';

export default async function Page({
  params: { serviceCategoryId, levelOrdinal }
}: {
  params: ServiceCategoryRouteParams;
}) {
  const { levelPartial, workProjectSeriesSchemaList } =
    await getLevelPartialAndSchemaList(levelOrdinal, serviceCategoryId);

  const data = await getSchemaBundleByExampleList([
    { knowledgeLevel: levelPartial }
  ]);
  return (
    <Card className={'w-fit'}>
      <CardHeader className={'flex justify-between'}>
        <span>Bundles Year {levelOrdinal} </span>
        <span>
          <AllBundlesTotal /> Periods All Bundles
        </span>
      </CardHeader>
      <CardBody>
        <WorkSeriesSchemaBundleTabGroup
          collectionData={data}
          referencedItemData={workProjectSeriesSchemaList}
          collectionEntityClass={EntityClassMap.workSeriesSchemaBundle}
          referencedEntityClass={EntityClassMap.workProjectSeriesSchema}
        />
      </CardBody>
    </Card>
  );
}
