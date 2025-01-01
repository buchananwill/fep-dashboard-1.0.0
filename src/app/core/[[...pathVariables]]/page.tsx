import { navTreeData } from '@/app/core/navigation/data/navTreeData';
import { ResolveNavTree } from '@/app/core/navigation/data/ResolveNavTree';
import { auth } from '@/auth';
import {
  getSchemaNameCookie,
  getSchemaRefreshCookie
} from '@/api/auth/get-schema-name-cookie';
import { redirect, usePathname } from 'next/navigation';

import { refreshSchemaTokens } from '@/api/actions-custom/schemas/refresh-schema-tokens';
import { FRONTEND_URL } from '@/api/BASE_URL';
import { NextRequest } from 'next/server';
import { SCHEMA_REFRESH_COOKIE } from '@/api/literals';

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
        console.log({ refreshCookie });
        const nextRequest = new NextRequest(
          `${FRONTEND_URL}/api/auth/schema-access?redirect=${encodeURIComponent(['core', ...pathVariables].join('/'))}`
        );
        nextRequest.headers.append(SCHEMA_REFRESH_COOKIE, refreshCookie.value);
        await fetch(nextRequest);
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
