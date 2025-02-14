import { Entity, Identifier, NamespacedHooks } from 'dto-stores';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { EmptyArray } from '@/api/client-literals';
import { CSSProperties, useCallback, useMemo } from 'react';
import { parseTen } from '@/api/date-and-time';

interface CheckBoxEntityGroupProps<T extends Identifier, E extends Entity> {
  labelAccessor?: (entity: E) => string;
  colorAccessor?: (entity: E) => string;
  entityClass: string;
}

export default function CheckBoxEntity<T extends Identifier, E extends Entity>({
  entityClass,
  labelAccessor,
  colorAccessor
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
        const colorString = colorAccessor ? colorAccessor(entity) : '';
        const style: CSSProperties = colorAccessor
          ? {
              color: colorString,
              backgroundColor: colorString,
              accentColor: colorString,
              borderColor: colorString,
              outlineColor: colorString
            }
          : {};
        let key = String(entity.id);
        return (
          <label
            // value={key}
            className={' relative select-none '}
            key={key}
            // onValueChange={(isSelected) => onValueChange(isSelected, key)}
          >
            <input
              type={'checkbox'}
              className={'relative -bottom-1 mr-1 h-5 w-5'}
              style={style}
              checked={selectedSet.has(key)}
              onChange={(event) => onValueChange(event.target.checked, key)}
            />
            {labelAccessor ? labelAccessor(entity) : String(entity)}
          </label>
        );
      })}
    </>
  );
}
