import { homePage, ResolveNavTree } from '@/app/core/navTree';
import { navTreeData } from '@/app/core/[[...pathVariables]]/navTreeData';

export default function page({
  params: { pathVariables }
}: {
  params: { pathVariables: string[] };
}) {
  return (
    <ResolveNavTree
      navTree={navTreeData}
      pathVariables={pathVariables}
      depth={0}
    />
  );
}
