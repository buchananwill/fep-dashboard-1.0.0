import { Checkbox } from '@nextui-org/checkbox';
import { Entity, Identifier, NamespacedHooks } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { EmptyArray } from '@/api/literals';
import { useCallback, useMemo } from 'react';
import { parseTen } from '@/api/date-and-time';

interface CheckBoxEntityGroupProps<T extends Identifier, E extends Entity> {
  labelAccessor?: (entity: E) => string;
  entityClass: string;
}

export default function CheckBoxEntity<T extends Identifier, E extends Entity>({
  entityClass,
  labelAccessor
}: CheckBoxEntityGroupProps<T, E>) {
  const listenerKey = useUuidListenerKey();
  const { currentState, dispatchWithoutControl } =
    NamespacedHooks.useDispatchAndListen<T[]>(
      entityClass,
      KEY_TYPES.SELECTED,
      listenerKey,
      EmptyArray
    );
  const { currentState: entities } = NamespacedHooks.useListen<E[]>(
    entityClass,
    KEY_TYPES.MASTER_LIST,
    listenerKey,
    EmptyArray
  );

  const selectedSet = useMemo(() => {
    return new Set(currentState.map((id) => String(id)));
  }, [currentState]);

  const onValueChange = useCallback(
    (isSelected: boolean, key: string) => {
      dispatchWithoutControl((selectedList) => {
        let numberOrNaN = parseTen(key);
        const id = isNaN(numberOrNaN) ? key : numberOrNaN;
        return isSelected
          ? [...selectedList, id as T]
          : selectedList.filter((id) => String(id) !== key);
      });
    },
    [dispatchWithoutControl]
  );

  return (
    <>
      {entities.map((entity) => {
        let key = String(entity.id);
        return (
          <Checkbox
            value={key}
            isSelected={selectedSet.has(key)}
            key={key}
            onValueChange={(isSelected) => onValueChange(isSelected, key)}
          >
            {labelAccessor ? labelAccessor(entity) : String(entity)}
          </Checkbox>
        );
      })}
    </>
  );
}
