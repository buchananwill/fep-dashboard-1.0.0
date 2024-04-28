'use server';
import { putEntities } from '@/app/api/actions/template-actions';
import { CycleSubspanGroupEditDto } from '@/app/cycles/edit/[id]/cycleSubspanGroups/_components/CycleSubspanGroupEdit';
import { API_V2_URL } from '@/app/api/main';

export const putGroupEditAction = async (
  entityList: CycleSubspanGroupEditDto[]
) => {
  const groupEditListUrl = `${API_V2_URL}/time/cycleSubspanGroups/cycleSubspanGroupEditList`;

  return putEntities(entityList, groupEditListUrl);
};
