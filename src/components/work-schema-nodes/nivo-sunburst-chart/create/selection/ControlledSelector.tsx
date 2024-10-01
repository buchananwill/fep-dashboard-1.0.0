import { Identifier, NamespacedHooks } from 'dto-stores';
import { HasIdClass } from '@/api/types';
import { TypedPaths } from '@/api/custom-types/typePaths';
import { Select, Selection, SelectProps } from '@nextui-org/react';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { EmptyArray } from '@/api/literals';
import { useCallback } from 'react';
import { parseTen } from '@/api/date-and-time';
import { SelectItem } from '@nextui-org/select';
import { get } from 'lodash';
import { getStartCaseDomainAlias } from '@/api/getDomainAlias';

export function ControlledSelector<
  ID_CLASS extends Identifier,
  T extends HasIdClass<ID_CLASS>
>({
  entityClass,
  entityId,
  selectionCallback,
  idType = 'number',
  labelPath,
  ...selectProps
}: {
  labelPath: TypedPaths<T, string | number>;
  entityId: ID_CLASS | null;
  entityClass: string;
  idType?: 'string' | 'number';
  selectionCallback?: (selection: T | undefined) => void;
} & Omit<
  SelectProps,
  'onSelectionChange' | 'selectedKeys' | 'items' | 'selectionMode' | 'children'
>) {
  const listenerKey = useUuidListenerKey();
  const label = getStartCaseDomainAlias(entityClass);

  const { currentState } = NamespacedHooks.useListen(
    entityClass,
    'masterList',
    listenerKey,
    EmptyArray as T[]
  );

  const onSelectionChange = useCallback(
    (value: Selection) => {
      if (!selectionCallback) {
      } else {
        if (value === 'all' || value.size > 1)
          throw new Error('Only single selection supported.');
        if (value.size === 1) {
          const selectedKey = String([...value.values()][0]);
          const id = idType === 'string' ? selectedKey : parseTen(selectedKey);
          const newItem =
            currentState.find((item) => item.id === id) ?? undefined;
          selectionCallback(newItem);
        } else {
          selectionCallback(undefined);
        }
      }
    },
    [idType, selectionCallback, currentState]
  );

  return (
    <Select
      {...selectProps}
      items={currentState}
      aria-label={selectProps['aria-label'] ?? label}
      label={selectProps.label ?? label}
      selectionMode={'single'}
      selectedKeys={entityId ? [String(entityId)] : EmptyArray}
      onSelectionChange={onSelectionChange}
    >
      {(entity) => (
        <SelectItem
          key={entity.id}
          value={entity.id}
          aria-label={get(entity, labelPath)}
        >
          {get(entity, labelPath)}
        </SelectItem>
      )}
    </Select>
  );
}
