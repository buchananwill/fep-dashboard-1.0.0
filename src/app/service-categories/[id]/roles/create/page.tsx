import { ServiceCategoryRouteParams } from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schema/serviceCategoryRouteParams';
import { getDtoListByExampleList } from '@/api/generated-actions/KnowledgeDomain';
import { DtoUiListAll, EditAddDeleteDtoControllerArray } from 'dto-stores';
import KnowledgeDomainRoleRow, {
  knowledgeDomainRoleRow
} from '@/app/service-categories/[id]/roles/create/_components/KnowledgeDomainRoleRow';

export default async function page({
  params: { id }
}: {
  params: Pick<ServiceCategoryRouteParams, 'id'>;
}) {
  const knowledgeDomains = await getDtoListByExampleList([
    { serviceCategoryId: parseInt(id) }
  ]);
  const rowStateInitial = knowledgeDomains.map((kd) => ({
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
      />
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
