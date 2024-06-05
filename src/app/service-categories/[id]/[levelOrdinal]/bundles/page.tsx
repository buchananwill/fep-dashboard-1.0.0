import { ServiceCategoryRouteParams } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schemas/serviceCategoryRouteParams';
import { getLevelPartialAndSchemaList } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schemas/_functions/getLevelPartialAndSchemaList';
import { SchemaBundleViewer } from '@/app/service-categories/[id]/[levelOrdinal]/bundles/_components/SchemaBundleViewer';
import { getDtoListByExampleList } from '@/api/generated-actions/KnowledgeLevel';
import { getDtoListByExampleList as getSchemaBundlesByExampleList } from '@/api/generated-actions/WorkSeriesSchemaBundle';

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
