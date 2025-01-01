import { navTreeData } from '@/app/core/navigation/data/navTreeData';
import { ResolveNavTree } from '@/app/core/navigation/data/ResolveNavTree';
import { auth } from '@/auth';
import {
  getSchemaNameCookie,
  getSchemaRefreshCookie
} from '@/api/auth/get-schema-name-cookie';
import { redirect, usePathname } from 'next/navigation';

import { refreshSchemaTokens } from '@/api/actions-custom/schemas/refresh-schema-tokens';

export default async function page(props: {
  params: Promise<{ pathVariables: string[] }>;
}) {
  const params = await props.params;

  const { pathVariables } = params;

  const session = await auth();
  if (session) {
    const schemaName = await getSchemaNameCookie();
    if (!schemaName) {
      const refreshCookie = await getSchemaRefreshCookie();
      if (refreshCookie) {
        redirect(
          `/api/auth/schema-access?redirect=${encodeURIComponent(['core', ...pathVariables].join('/'))}`
        );
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
