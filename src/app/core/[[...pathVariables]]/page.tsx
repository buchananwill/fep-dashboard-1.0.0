import { navTreeData } from '@/app/core/navigation/navTreeData';
import { ResolveNavTree } from '@/app/core/navigation/ResolveNavTree';
import { auth } from '@/auth';
import { LinkButton } from '@/app/service-categories/LinkButton';

export default async function page({
  params: { pathVariables }
}: {
  params: { pathVariables: string[] };
}) {
  const session = await auth();
  if (!session)
    return <LinkButton href={'/login'}>Go To Login Page</LinkButton>;
  return (
    <ResolveNavTree
      navTree={navTreeData}
      pathVariables={pathVariables}
      depth={0}
    />
  );
}
