import { IdInnerCellProps } from '@/components/tables/core-table-types';
import EditTextWithUniqueConstraintCell from '@/components/tables/cells-v2/EditTextWithUniqueConstraintCell';
import { HasIdClass } from '@/api/types';
import { Identifier } from 'dto-stores';

export default function EditShortCodeCell(props: IdInnerCellProps<string>) {
  return (
    <EditTextWithUniqueConstraintCell<
      { shortCode: string } & HasIdClass<Identifier>
    >
      {...props}
      path={'shortCode'}
      allowEmpty={true}
    />
  );
}
