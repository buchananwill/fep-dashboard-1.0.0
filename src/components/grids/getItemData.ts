export function getItemData<T, U>(rowIdList: T[], columnIdList: U[]) {
  return rowIdList.map((rowId) => {
    return columnIdList.map((columnId) => ({
      rowId,
      columnId
    }));
  });
}
