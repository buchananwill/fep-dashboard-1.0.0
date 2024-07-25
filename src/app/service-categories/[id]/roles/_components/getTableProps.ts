import { HasIdClass, Identifier } from 'dto-stores';
import { getIdList } from '@/app/service-categories/[id]/roles/_components/getIdList';
import { getItemData } from '@/app/service-categories/[id]/roles/_components/getItemData';

export function getTableProps<
  T extends HasIdClass<U>,
  U extends Identifier,
  V extends HasIdClass<W>,
  W extends Identifier
>(providerRoles: T[], cycleSubspanList: V[]) {
  const rowIdList: U[] = getIdList(providerRoles);
  const columnIdList: W[] = getIdList(cycleSubspanList);

  const itemData = getItemData(rowIdList, columnIdList);
  return { rowIdList, columnIdList, itemData };
}