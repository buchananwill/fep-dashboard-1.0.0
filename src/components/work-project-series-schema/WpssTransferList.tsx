'use client';
import { WorkProjectSeriesSchemaDto } from '@/api/generated-types/generated-types';
import { useSelectApi } from '@/hooks/select-adaptors/useSelectApi';
import { useLabelMaker } from '@/hooks/select-adaptors/useLabelMaker';
import { joinWorkProjectSeriesSchemaIdKey } from '@/functions/workProjectSeriesSchemaIdTransforms';
import { useCallback, useState } from 'react';
import { TransferList } from '@/components/generic/combo-boxes/TransferList';
import { WorkProjectSeriesSchemaPill } from '@/components/work-project-series-schema/_components/WorkProjectSeriesSchemaPill';

export function WpssTransferList({
  dtoList: rawData
}: {
  dtoList: WorkProjectSeriesSchemaDto[];
}) {
  const labelMaker = useLabelMaker<WorkProjectSeriesSchemaDto>(
    joinWorkProjectSeriesSchemaIdKey
  );
  const [selectionList, setSelectionList] = useState(
    [] as WorkProjectSeriesSchemaDto[]
  );
  const propagateChange = useCallback(
    (list: WorkProjectSeriesSchemaDto[] | undefined) => {
      if (list) setSelectionList(list);
      else setSelectionList([]);
    },
    []
  );

  const selectApiReturn = useSelectApi<WorkProjectSeriesSchemaDto>({
    rawData,
    type: 'multiFlat',
    labelMaker,
    value: selectionList,
    propagateChange
  });

  if (selectApiReturn.type !== 'multiFlat')
    throw new Error('wrong type returned');

  return (
    <TransferList
      {...selectApiReturn}
      customLabel={WorkProjectSeriesSchemaPill}
    />
  );
}
