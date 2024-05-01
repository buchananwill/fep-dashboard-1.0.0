import { getDtoListByExampleList as getSchemaBundlesByExampleList } from '@/app/api/generated-actions/WorkSeriesSchemaBundle';
import { ServiceCategoryRouteParams } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/serviceCategoryRouteParams';
import { getLevelPartialAndSchemaList } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/functions/getLevelPartialAndSchemaList';
import { SchemaBundleViewer } from '@/app/service-categories/[id]/[levelOrdinal]/bundles/components/SchemaBundleViewer';
import { getDtoListByExampleList } from '@/app/api/generated-actions/KnowledgeLevel';

export default async function Page({
  params: { id, levelOrdinal }
}: {
  params: ServiceCategoryRouteParams;
}) {
  const { levelPartial, workProjectSeriesSchemaList } =
    await getLevelPartialAndSchemaList(levelOrdinal, id);

  const [knowledgeLevel] = await getDtoListByExampleList([levelPartial]);

  const data = await getSchemaBundlesByExampleList([
    { knowledgeLevel: levelPartial }
  ]);
  return (
    <SchemaBundleViewer
      knowledgeLevel={knowledgeLevel}
      collectionData={data}
      referencedItemData={workProjectSeriesSchemaList}
    />
  );
}
