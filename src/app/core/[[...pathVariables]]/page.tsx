import { navTreeData } from '@/app/core/navigation/data/navTreeData';
import { ResolveNavTree } from '@/app/core/navigation/data/ResolveNavTree';
import { auth } from '@/auth';
import { headers } from 'next/headers';
import { getSchemaName } from '@/api/auth/get-schema-name';
import { redirect } from 'next/navigation';

export default async function page(
  props: {
    params: Promise<{ pathVariables: string[] }>;
  }
) {
  const params = await props.params;

  const {
    pathVariables
  } = params;

  const session = await auth();
  if (session) {
    const headers1 = await headers();
    console.log({ headers1, message: 'HEADERS HERE' });
    const schemaName = await getSchemaName();
    console.log({ schemaName, message: 'SCHEMA NAME COOKIE HERE' });
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
