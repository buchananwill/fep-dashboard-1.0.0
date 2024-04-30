'use server';
import { getWorkTaskTypeTableLookUp } from '@/utils/init-json-data/service-categories/getWorkTaskTypeTableLookUp';
import data from '@/utils/init-json-data/service-categories/workTaskTypesIgm.json';

export const workTaskTypeTableLookUp = getWorkTaskTypeTableLookUp(data);
