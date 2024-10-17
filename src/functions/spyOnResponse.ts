export async function spyOnResponse(action: () => Promise<any>) {
  const response = await action();
  console.log(response); // KEEP LOG
  return response;
}
