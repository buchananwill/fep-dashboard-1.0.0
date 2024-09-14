'use server';
import { callMicrosoftApi } from '@/api/microsoft-graph/callMicrosoftApi';

export async function deleteEventsAction(idList: string[]) {
  const responses = [];
  let counter = 0;
  let index = 0;

  // Helper function to introduce a delay
  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  while (responses.length < idList.length && counter < 1000) {
    const response = await callMicrosoftApi(
      { method: 'DELETE' },
      `/events/${idList[index]}`
    );
    if (response.status == 204) {
      responses.push(response);
      await wait(200);
      index++;
    } else {
      await wait(500);
      counter++;
    }
  }

  console.log(responses);
}
