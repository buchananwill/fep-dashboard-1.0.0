import { EntityInnerCellProps } from '@/components/tables/core-table-types';
import { KnowledgeDomainDto } from '@/api/generated-types/generated-types';
import { useCallback, useMemo } from 'react';
import { Button } from '@mantine/core';
import { ColumnUid } from '@/types';
import { parseToCssRgba } from '@/components/tables/edit-tables/parseToCssRgba';
import { HasIdClass } from '@/api/types';
import { Identifier } from 'dto-stores';
import { get } from 'lodash';
import { useGlobalDispatch } from 'selective-context';
import {
  getFilterPropertyContextKey,
  getFilterValueContextKey
} from '@/hooks/table-hooks/useClientSideFilteringIdList';
import { useEntityTableContext } from '@/hooks/table-hooks/table-context';
import { SetOptional } from 'type-fest';

export default function EmbeddedKnowledgeDomainCell<
  T extends HasIdClass<T_ID>,
  T_ID extends Identifier,
  K extends string & ColumnUid<T>
>({
  entity,
  columnKey
}: SetOptional<
  EntityInnerCellProps<T, T_ID, K>,
  'dispatchWithoutControl' | 'dispatchDeletion' | 'deleted'
>) {
  const { entityClass } = useEntityTableContext();
  const splitColumnKey = String(columnKey).split('.');
  const knowledgeDomainNestedLevel = splitColumnKey.indexOf('knowledgeDomain');
  const knowledgeDomainKey = splitColumnKey
    .slice(0, knowledgeDomainNestedLevel + 1)
    .join('.');
  const knowledgeDomain = get(entity, knowledgeDomainKey) as
    | KnowledgeDomainDto
    | undefined;
  const color = knowledgeDomain?.color;
  const value = get(entity, columnKey);

  const { dispatchWithoutListen: dispatchFilterColumn } = useGlobalDispatch(
    getFilterPropertyContextKey(entityClass)
  );
  const { dispatchWithoutListen: dispatchFilterValue } = useGlobalDispatch(
    getFilterValueContextKey(entityClass)
  );

  const handleClick = useCallback(() => {
    dispatchFilterColumn(columnKey);
    dispatchFilterValue(value);
  }, [dispatchFilterColumn, dispatchFilterValue, value, columnKey]);

  const coloString = useMemo(() => {
    return parseToCssRgba(color);
  }, [color]);

  return (
    <Button
      color={coloString}
      variant={coloString ? 'filled' : 'light'}
      autoContrast={true}
      fullWidth
      radius={'xs'}
      onClick={handleClick}
    >
      {value}
    </Button>
  );
}
