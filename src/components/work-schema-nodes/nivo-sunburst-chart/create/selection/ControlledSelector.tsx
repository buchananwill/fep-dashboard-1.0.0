import { Identifier } from 'dto-stores';
import { HasIdClass } from '@/api/types';
import { TypedPaths } from '@/api/custom-types/typePaths';
import { Select, SelectProps } from '@mantine/core';
import { useEntitySelectionWithSimpleSelectables } from '@/hooks/useEntitySelectionWithSimpleSelectables';
import { useCallback, useRef } from 'react';
import { useSyncStateToPropOnFirstRenderTheEntityToStateOnFutureRenders } from '@/components/work-schema/_components/useSyncStateToPropOnFirstRenderTheEntityToStateOnFutureRenders';

export function ControlledSelector<
  ID_CLASS extends Identifier,
  T extends HasIdClass<ID_CLASS>
>({
  entityClass,
  entityId,
  selectionCallback,
  labelPath,
  error
}: {
  labelPath: TypedPaths<T, string | number>;
  entityId: ID_CLASS | null;
  entityClass: string;
  selectionCallback?: (selection: T | undefined) => void;
  error?: SelectProps['error'];
}) {
  const selectionPropRef = useRef(entityId ? [entityId] : ([] as ID_CLASS[]));

  const { onChange, selectableList, idMap } =
    useEntitySelectionWithSimpleSelectables(entityClass, labelPath);

  const propagateUpdate = useCallback(
    (list: ID_CLASS[]) => {
      if (!selectionCallback) return;
      if (list.length === 0) {
        selectionCallback(undefined);
      } else {
        selectionCallback(idMap.get(list[0]));
      }
    },
    [selectionCallback, idMap]
  );

  useSyncStateToPropOnFirstRenderTheEntityToStateOnFutureRenders(
    selectionPropRef.current,
    propagateUpdate,
    entityClass
  );

  return (
    <Select
      value={entityId ? String(entityId) : null}
      onChange={onChange}
      data={selectableList}
      error={error}
    />
  );
}
