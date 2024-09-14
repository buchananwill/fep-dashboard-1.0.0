'use client';
import { Identifier, LazyDtoUiListSome } from 'dto-stores';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import {
  BaseDtoStoreNumberInputProps,
  DtoStoreNumberInput
} from '@/components/generic/DtoStoreNumberInput';
import { HasId } from '@/api/types';

export default function NumberEditCellList<T extends HasId>({
  cellIdList,
  entityClass,
  ...inputProps
}: {
  cellIdList: Identifier[];
  entityClass: string;
} & BaseDtoStoreNumberInputProps<T>) {
  return (
    <LazyDtoUiListSome<T, BaseDtoStoreNumberInputProps<T>>
      entityIdList={cellIdList}
      entityClass={entityClass}
      {...inputProps}
      renderAs={(props) => (
        <td>
          <DtoStoreNumberInput {...props} />
        </td>
      )}
      whileLoading={() => (
        <td className={'relative'}>
          <PendingOverlay pending={true} />
        </td>
      )}
    />
  );
}
