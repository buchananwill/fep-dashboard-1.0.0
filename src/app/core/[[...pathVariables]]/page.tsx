import { navTreeData } from '@/app/core/navigation/data/navTreeData';
import { ResolveNavTree } from '@/app/core/navigation/data/ResolveNavTree';
import { auth } from '@/auth';
import { headers } from 'next/headers';
import { getSchemaName } from '@/api/auth/get-schema-name';
import { redirect } from 'next/navigation';

export default async function page({
  params: { pathVariables }
}: {
  params: { pathVariables: string[] };
}) {
  const session = await auth();
  if (session) {
    const headers1 = headers();
    console.log(headers1);
    const schemaName = getSchemaName();
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
