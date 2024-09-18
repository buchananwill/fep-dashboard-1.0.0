export async function spyOnResponse(action: () => Promise<any>) {
  const response = await action();
  console.log(response);
  return response;
}
