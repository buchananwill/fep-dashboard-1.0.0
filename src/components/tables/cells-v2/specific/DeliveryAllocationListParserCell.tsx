import { IdInnerCellProps } from '@/components/tables/core-table-types';
import { StringNumberListParserCell } from '@/components/tables/cells-v2/generic/StringNumberListParserCell';

export function DeliveryAllocationListParserCell({
  onChange,
  value,
  entityId,
  entityClass
}: IdInnerCellProps<string | undefined>) {
  return (
    <StringNumberListParserCell
      entityId={entityId}
      entityClass={entityClass}
      value={value ?? ''}
      onChange={onChange}
    />
  );
}
