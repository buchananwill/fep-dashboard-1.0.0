import {
  BaseDtoStoreNumberInputProps,
  ConditionalNumberClassName,
  DtoStoreNumberInput
} from '@/components/generic/DtoStoreNumberInput';
import React, { CSSProperties } from 'react';
import { ProviderRoleTypeWorkTaskTypeSuitabilityDto } from '@/api/dtos/ProviderRoleTypeWorkTaskTypeSuitabilityDtoSchema';
import { LazyDtoUiWrapper } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import clsx from 'clsx';
import { areEqual } from 'react-window';

const conditionalNumberFormatting: ConditionalNumberClassName[] = [
  { startAt: -1, className: 'opacity-50' },
  { startAt: 0, className: '' },
  { startAt: 1, className: ' bg-red-100' },
  { startAt: 2, className: ' bg-amber-100' },
  { startAt: 3, className: ' bg-yellow-100' },
  { startAt: 4, className: ' bg-emerald-100' }
];
const CellComponent = ({
  columnIndex,
  rowIndex,
  style,
  data
}: {
  columnIndex: number;
  rowIndex: number;
  style: CSSProperties;
  data: ProviderRoleTypeWorkTaskTypeSuitabilityDto[][];
}) => {
  console.log('re-rendering cell');
  const datumElement = data[rowIndex][columnIndex];

  const id = datumElement?.id;

  return (
    <div style={style}>
      <LazyDtoUiWrapper<
        ProviderRoleTypeWorkTaskTypeSuitabilityDto,
        BaseDtoStoreNumberInputProps<ProviderRoleTypeWorkTaskTypeSuitabilityDto>
      >
        entityClass={EntityClassMap.providerRoleTypeWorkTaskTypeSuitability}
        renderAs={DtoStoreNumberInput}
        whileLoading={() => (
          <div className={'relative'}>
            <PendingOverlay pending={true} />
          </div>
        )}
        numberKey={'rating'}
        min={0}
        allowFloat={true}
        onFocus={() => console.log(datumElement)}
        className={clsx('h-[95%] w-[95%] p-2 text-sm')}
        conditionalValueClassNames={conditionalNumberFormatting}
        entityId={id}
      />
    </div>
  );
};
export const CellComponentMemo = React.memo(CellComponent, areEqual);
