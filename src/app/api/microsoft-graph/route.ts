import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getToken } from 'next-auth/jwt';

export async function GET(request: NextRequest) {
  return new Response('{status: 200}');
}
