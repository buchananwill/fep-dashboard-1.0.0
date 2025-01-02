// export { auth as middleware } from '@/auth';

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

const custom = (request: NextRequest) => {
  return NextResponse.next();
};

export default auth(custom);
