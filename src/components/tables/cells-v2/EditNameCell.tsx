import { HasIdClass } from '@/api/types';
import { Identifier } from 'dto-stores';
import { HasName } from 'react-d3-force-wrapper';
import { IdInnerCellProps } from '@/components/tables/core-table-types';
import EditTextWithUniqueConstraintCell from '@/components/tables/cells-v2/EditTextWithUniqueConstraintCell';

export default function EditNameCell(props: IdInnerCellProps<string>) {
  return (
    <EditTextWithUniqueConstraintCell<HasName & HasIdClass<Identifier>>
      {...props}
      path={'name'}
      allowEmpty={false}
    />
  );
}
