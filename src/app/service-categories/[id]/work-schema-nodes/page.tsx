import { Api } from '@/api/clientApi';
import { Link } from '@nextui-org/link';
import { ServiceCategoryRouteParams } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schemas/serviceCategoryRouteParams';

export default async function page({
  params: { id }
}: {
  params: ServiceCategoryRouteParams;
}) {
  const rootNodeList = await Api.WorkSchemaNode.getRootNodeList();

  return (
    <div className={'flex flex-col gap-2'}>
      {rootNodeList.map((node) => (
        <Link
          key={node.id}
          href={`/service-categories/${id}/work-schema-nodes/${node.id}`}
        >
          {node.name ?? `Work Schema Node: ${node.id}`}
        </Link>
      ))}
    </div>
  );
}
