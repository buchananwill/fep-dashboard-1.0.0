import { EntityInnerCellProps } from '@/components/tables/core-table-types';
import { WorkTypeDto } from '@/api/generated-types/generated-types_';
import { ColumnUid } from '@/types';
import { HasIdClass } from '@/api/types';
import { Identifier } from 'dto-stores';
import EmbeddedKnowledgeDomainCell from '@/components/tables/cells-v2/specific/EmbeddedKnowledgeDomainCell';
import { get } from 'lodash';
import { AnyValueToString } from '@/components/tables/cells-v2/generic/AnyValueToString';
import { useEntityTableContext } from '@/hooks/table-hooks/table-context';

export default function EmbeddedWorkTypeCell<
  T extends HasIdClass<T_ID> & { workType: WorkTypeDto },
  T_ID extends Identifier,
  K extends string & ColumnUid<T>
>({
  entity,
  columnKey,
  dispatchWithoutControl
}: EntityInnerCellProps<T, T_ID, K>) {
  const { entityClass } = useEntityTableContext();
  const value = get(entity, columnKey);
  const splitKeyPath = String(columnKey).split('.');
  if (splitKeyPath.length > 1) {
    const embeddedKey = splitKeyPath[1];

    if (embeddedKey === 'knowledgeDomain') {
      return (
        <EmbeddedKnowledgeDomainCell
          columnKey={columnKey}
          entity={entity}
          deleted={false}
        />
      );
    } else if (embeddedKey === 'knowledgeLevel') {
      return (
        <AnyValueToString
          entityId={entity.id}
          entityClass={entityClass}
          value={value}
        />
      );
    }
  }

  return value;
}
// return (
//   <Button
//     color={coloString}
//     variant={coloString ? 'filled' : 'light'}
//     autoContrast={true}
//     fullWidth
//     radius={'xs'}
//     onClick={handleClick}
//   >
//     {value}
//   </Button>
