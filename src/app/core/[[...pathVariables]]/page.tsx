import { getSchemaNameCookie } from '@/api/auth/get-schema-name-cookie';
import { navTreeData } from '@/app/core/navigation/data/navTreeData';
import { ResolveNavTree } from '@/app/core/navigation/data/ResolveNavTree';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function page(props: {
  params: Promise<{ pathVariables: string[] }>;
}) {
  const params = await props.params;

  const { pathVariables } = params;
  await checkAuthAndSchemaStatus();

  return (
    <ResolveNavTree
      currentNode={navTreeData}
      rootNode={navTreeData}
      pathVariables={pathVariables ?? []}
      depth={0}
    />
  );
}

async function checkAuthAndSchemaStatus() {
  const session = await auth();
  if (session) {
    const schemaName = await getSchemaNameCookie();
    if (!schemaName) {
      redirect('/admin/create-schema');
    }
  }
}
