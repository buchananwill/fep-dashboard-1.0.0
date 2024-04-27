'use server';
import { ActionResponsePromise } from '@/app/api/actions/actionResponse';

export async function actionResponseHandler<T>(
  apiCall: () => ActionResponsePromise<T>,
  message?: string
) {
  const actionResponse = await apiCall();
  if (actionResponse.data === undefined)
    throw Error(message || actionResponse.message);
  return actionResponse.data;
}
