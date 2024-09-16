import { spyOnResponse } from '@/components/tables/edit-tables/spyOnResponse';
import { Api } from '@/api/clientApi_';

(list: any[]) => {
  'use server';
  spyOnResponse(() => Api.WorkTaskType.deleteIdList(list));
};
