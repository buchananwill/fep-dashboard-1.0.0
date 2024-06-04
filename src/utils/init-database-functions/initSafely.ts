import { canAssignToOrderItem } from '@/app/service-categories/[id]/[levelOrdinal]/carousel-groups/orders/_functions/canAssignOptionToOrderItem';

export async function initSafely(
  getAction: () => Promise<any[]>,
  postAction: () => Promise<any>
) {
  try {
    const array = await getAction();
    if (array.length === 0) {
      return postAction();
    } else return array;
  } catch (err) {
    console.log(err);
  }
}
