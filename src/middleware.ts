// export { auth as middleware } from '@/auth';

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import {
  checkJwtExpiration,
  getSchemaNameCookie,
  getSchemaRefreshCookie
} from '@/api/auth/get-schema-name-cookie';
import { redirect } from 'next/navigation';

const custom = async (request: NextRequest) => {
  console.log('in middleware');
  let response = NextResponse.next();
  let url = request.nextUrl.clone();
  const pathname = request.nextUrl.pathname;
  console.log({ url, pathname });
  const session = await auth();
  if (session) {
    const schemaName = await getSchemaNameCookie();
    if (!schemaName || checkJwtExpiration(schemaName) !== 'valid') {
      const refreshCookie = await getSchemaRefreshCookie();
      if (refreshCookie) {
        if (checkJwtExpiration(refreshCookie) !== 'expired') {
          const searchParams = url.searchParams;
          searchParams.set('redirect', pathname);
          url.pathname = `/api/auth/refresh-schema-access`;
          response = NextResponse.rewrite(url);
        } else {
          url.pathname = '/api/auth/generate-schema-access';
          response = NextResponse.rewrite(url);
        }
      } else {
        url.pathname = '/admin/create-schema';
        response = NextResponse.rewrite(url);
      }
    }
  }
  console.log({ response, url, pathname });
  return response; //NextResponse.next();
};

export default custom; //auth(custom);
