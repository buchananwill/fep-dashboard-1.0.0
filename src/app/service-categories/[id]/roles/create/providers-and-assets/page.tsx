import { ServiceCategoryRouteParams } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schemas/serviceCategoryRouteParams';
import { getDtoListByExampleList } from '@/api/generated-actions/KnowledgeDomain';
import { DtoUiListAll, EditAddDeleteDtoControllerArray } from 'dto-stores';
import KnowledgeDomainRoleRow, {
  knowledgeDomainRoleRow
} from '@/app/service-categories/[id]/roles/create/providers-and-assets/_components/KnowledgeDomainRoleRow';
import { getOne } from '@/api/generated-actions/ServiceCategory';
import { knowledgeDomainRowActionMapper } from '@/app/service-categories/[id]/roles/create/providers-and-assets/knowledgeDomainRowActionMapper';
import { sortEntityListOnStringProperty } from '@/functions/sortEntityListOnStringProperty';

export default async function page({
  params: { id }
}: {
  params: Pick<ServiceCategoryRouteParams, 'id'>;
}) {
  const serviceCategoryId = parseInt(id);
  const serviceCategory = await getOne(serviceCategoryId);
  const knowledgeDomains = await getDtoListByExampleList([
    { serviceCategoryId: serviceCategoryId }
  ]);
  const rowStateInitial = sortEntityListOnStringProperty(
    knowledgeDomains,
    'name',
    'asc'
  ).map((kd) => ({
    id: kd.id,
    knowledgeDomain: kd,
    providerRoleCount: 0,
    assetRoleCount: 0
  }));

  return (
    <table>
      <EditAddDeleteDtoControllerArray
        entityClass={knowledgeDomainRoleRow}
        dtoList={rowStateInitial}
        updateServerAction={knowledgeDomainRowActionMapper}
      />
      <thead>
        <tr>
          <th>{serviceCategory.knowledgeDomainDescriptor}</th>
          <th>Teachers</th>
          <th>Rooms</th>
        </tr>
      </thead>
      <tbody>
        <DtoUiListAll
          entityClass={knowledgeDomainRoleRow}
          renderAs={KnowledgeDomainRoleRow}
        />
      </tbody>
    </table>
  );
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
