import { DtoUiListAll, EditAddDeleteDtoControllerArray } from 'dto-stores';
import KnowledgeDomainRoleRow, {
  knowledgeDomainRoleRow
} from '@/app/admin/init/providers-and-assets/_components/KnowledgeDomainRoleRow';
import { knowledgeDomainRowActionMapper } from '@/app/admin/init/providers-and-assets/knowledgeDomainRowActionMapper';
import { sortEntityListOnStringProperty } from '@/functions/sortEntityListOnStringProperty';
import { Api } from '@/api/clientApi_';
import { getDomainAlias } from '@/api/getDomainAlias';

export default async function page({}: {}) {
  const knowledgeDomains = await Api.KnowledgeDomain.getAll();
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
          <th>{getDomainAlias('knowledgeDomain')}</th>
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
