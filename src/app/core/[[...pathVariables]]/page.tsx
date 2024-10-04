import { navTreeData } from '@/app/core/navigation/data/navTreeData';
import { ResolveNavTree } from '@/app/core/navigation/data/ResolveNavTree';

export default async function page({
  params: { pathVariables }
}: {
  params: { pathVariables: string[] };
}) {
  return (
    <ResolveNavTree
      currentNode={navTreeData}
      rootNode={navTreeData}
      pathVariables={pathVariables ?? []}
      depth={0}
    />
  );
}
