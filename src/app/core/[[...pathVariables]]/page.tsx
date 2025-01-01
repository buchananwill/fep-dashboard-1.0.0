import { navTreeData } from '@/app/core/navigation/data/navTreeData';
import { ResolveNavTree } from '@/app/core/navigation/data/ResolveNavTree';
import { auth } from '@/auth';
import {
  checkJwtExpiration,
  getSchemaNameCookie,
  getSchemaRefreshCookie
} from '@/api/auth/get-schema-name-cookie';
import { redirect } from 'next/navigation';

export default async function page(props: {
  params: Promise<{ pathVariables: string[] }>;
}) {
  const params = await props.params;

  const { pathVariables } = params;

  const session = await auth();
  if (session) {
    const schemaName = await getSchemaNameCookie();
    if (!schemaName || checkJwtExpiration(schemaName) !== 'valid') {
      const refreshCookie = await getSchemaRefreshCookie();
      if (refreshCookie) {
        if (checkJwtExpiration(refreshCookie) !== 'expired') {
          const searchParams = new URLSearchParams();
          searchParams.set('redirect', ['core', ...pathVariables].join('/'));
          redirect(
            `/api/auth/refresh-schema-access?${searchParams.toString()}`
          );
        } else {
          redirect('/api/auth/generate-schema-access');
        }
      } else {
        redirect('/admin/create-schema');
      }
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
