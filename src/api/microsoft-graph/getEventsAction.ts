'use server';
import { callMicrosoftApi } from '@/api/microsoft-graph/callMicrosoftApi';

export async function getEventsAction(optionalParams?: string[]) {
  const response = await callMicrosoftApi(
    { method: 'GET' },
    `/events${optionalParams ? '?' + optionalParams.join('&') : ''}`
  );
  return response.json();
}
