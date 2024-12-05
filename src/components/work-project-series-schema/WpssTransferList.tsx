'use client';
import { WorkProjectSeriesSchemaDto } from '@/api/generated-types/generated-types';
import { useSelectApi } from '@/hooks/select-adaptors/useSelectApi';
import { useLabelMaker } from '@/hooks/select-adaptors/useLabelMaker';
import { joinWorkProjectSeriesSchemaIdKey } from '@/functions/workProjectSeriesSchemaIdTransforms';
import { useCallback, useState } from 'react';
import { TransferList } from '@/components/generic/combo-boxes/TransferList';
import { WorkProjectSeriesSchemaPill } from '@/components/work-project-series-schema/_components/WorkProjectSeriesSchemaPill';
import { SelectApiParamsMultiFlat } from '@/hooks/select-adaptors/selectApiTypes';

export function WpssTransferList({
  dtoList: rawData,
  selectionList,
  propagateChange
}: {
  dtoList: WorkProjectSeriesSchemaDto[];
  selectionList: WorkProjectSeriesSchemaDto[];
  propagateChange?: (list: WorkProjectSeriesSchemaDto[] | undefined) => void;
}) {
  const labelMaker = useLabelMaker<WorkProjectSeriesSchemaDto>(
    joinWorkProjectSeriesSchemaIdKey
  );

  const selectApiReturn = useSelectApi<
    SelectApiParamsMultiFlat<WorkProjectSeriesSchemaDto>
  >({
    rawData,
    type: 'multiFlat',
    labelMaker,
    value: selectionList,
    propagateChange: propagateChange ?? ((list) => {})
  });

  if (selectApiReturn.type !== 'multiFlat')
    throw new Error('wrong type returned');

  return (
    <TransferList
      {...selectApiReturn}
      customLabel={WorkProjectSeriesSchemaPill}
      mah={'24em'}
    />
  );
}

const badArray = ['hello', 'world'];
