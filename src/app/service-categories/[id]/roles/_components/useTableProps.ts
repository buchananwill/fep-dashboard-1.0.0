import { HasIdClass, Identifier } from 'dto-stores';
import { getIdList } from '@/app/service-categories/[id]/roles/_components/getIdList';
import { getItemData } from '@/app/service-categories/[id]/roles/_components/getItemData';
import { useMemo } from 'react';

export function useTableProps<
  T extends HasIdClass<U>,
  U extends Identifier,
  V extends HasIdClass<W>,
  W extends Identifier
>(rowList: T[], columnList: V[]) {
  return useMemo(() => {
    const rowIdList: U[] = getIdList(rowList);
    const columnIdList: W[] = getIdList(columnList);

    const itemData = getItemData(rowIdList, columnIdList);
    return { rowIdList, columnIdList, itemData };
  }, [rowList, columnList]);
}