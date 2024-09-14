'use server';
import { auth } from '@/auth';
import { MICROSOFT_GRAPH_DELEGATED } from '@/api/literals';
import { SessionWithAccessToken } from '@/api/microsoft-graph/sessionWithAccessToken';
import { produce } from 'immer';

export async function callMicrosoftApi(request: RequestInit, endpoint: string) {
  const session = (await auth()) as SessionWithAccessToken;
  const accessToken = session?.accessToken;
  let response = new Response();
  if (session && accessToken) {
    const authorizedRequest = produce(request, (draft) => {
      let headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      };
      draft.headers = { ...draft.headers, ...headers };
    });
    response = await fetch(
      `${MICROSOFT_GRAPH_DELEGATED}${endpoint}`,
      authorizedRequest
    );
  }

  return response;
}
