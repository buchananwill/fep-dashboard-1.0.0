import EditTextWithModalCell, {
  EditTextWithModalCellProps
} from '@/components/tables/cells-v2/EditTextWithModalCell';
import { useUniqueStringFieldConstraint } from '@/hooks/useUniqueStringFieldConstraint';
import { HasIdClass } from '@/api/types';
import { Identifier } from 'dto-stores';
import { TypedPaths } from '@/api/custom-types/typePaths';

export default function EditTextWithUniqueConstraintCell<
  T extends HasIdClass<Identifier>
>(
  props: Omit<EditTextWithModalCellProps, 'validator'> & {
    path: TypedPaths<T, string>;
    allowEmpty?: boolean;
  }
) {
  const { entityId, entityClass, path, allowEmpty, ...otherProps } = props;

  const validator = useUniqueStringFieldConstraint<T>(
    entityClass,
    entityId,
    path,
    allowEmpty ?? true
  );

  return (
    <EditTextWithModalCell
      entityId={entityId}
      entityClass={entityClass}
      {...otherProps}
      validator={validator}
    />
  );
}
