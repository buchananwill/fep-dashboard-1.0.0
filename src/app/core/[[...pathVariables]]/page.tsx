import { navTreeData } from '@/app/core/navigation/data/navTreeData';
import { ResolveNavTree } from '@/app/core/navigation/data/ResolveNavTree';
import { auth } from '@/auth';
import { getSchemaNameCookie } from '@/api/auth/get-schema-name-cookie';
import { redirect } from 'next/navigation';

export default async function page(props: {
  params: Promise<{ pathVariables: string[] }>;
}) {
  const params = await props.params;

  const { pathVariables } = params;

  const session = await auth();
  if (session) {
    const schemaName = await getSchemaNameCookie();
    if (!schemaName) {
      redirect('/admin/create-schema');
    }
  }

  return (
    <ResolveNavTree
      currentNode={navTreeData}
      rootNode={navTreeData}
      pathVariables={pathVariables ?? []}
      depth={0}
    />
  );
}
