import { navTreeData } from '@/app/core/[[...pathVariables]]/navTreeData';
import { ResolveNavTree } from '@/app/core/ResolveNavTree';

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
