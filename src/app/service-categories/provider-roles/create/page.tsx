import { ServiceCategoryRouteParams } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/serviceCategoryRouteParams';
import { getDtoListByExampleList } from '@/api/generated-actions/KnowledgeDomain';

export default async function page({
  params: { id }
}: {
  params: Pick<ServiceCategoryRouteParams, 'id'>;
}) {
  await getDtoListByExampleList([{ serviceCategoryId: parseInt(id) }]);
}

/*
 * What are we going to do? (Don't forget - we want to re-use this logic for the rooms!)
 * 1. Display a list of subjects (knowledge domains).
 * 2. Display a number input with each KD.
 * 3. Allow these to be edited.
 * 4. Show a submit button at the bottom.
 * 5. The submit button sends a JSON map of KD id: number to the back end.
 * 6. The server creates PRT_WTT_suitabilities and availabilities for every WTT in that KD * the number specified.
 * 7. This creates an initial assumption that every person of Teacher role is suitable for all WTT in that KD.
 * */
