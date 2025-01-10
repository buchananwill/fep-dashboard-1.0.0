'use client';
import { WorkSchemaDto } from '@/api/generated-types/generated-types_';
import { useSelectApi } from '@/hooks/select-adaptors/useSelectApi';
import { useLabelMaker } from '@/hooks/select-adaptors/useLabelMaker';
import { joinWorkSchemaIdKey } from '@/functions/workSchemaIdTransforms';
import { TransferList } from '@/components/generic/combo-boxes/TransferList';
import { WorkSchemaPill } from '@/components/work-schema/_components/WorkSchemaPill';
import { SelectApiParamsMultiFlat } from '@/hooks/select-adaptors/selectApiTypes';

export function WpssTransferList({
  dtoList: rawData,
  selectionList,
  propagateChange
}: {
  dtoList: WorkSchemaDto[];
  selectionList: WorkSchemaDto[];
  propagateChange?: (list: WorkSchemaDto[] | undefined) => void;
}) {
  const labelMaker = useLabelMaker<WorkSchemaDto>(joinWorkSchemaIdKey);

  const selectApiReturn = useSelectApi<SelectApiParamsMultiFlat<WorkSchemaDto>>(
    {
      rawData,
      type: 'multiFlat',
      labelMaker,
      value: selectionList,
      propagateChange: propagateChange ?? ((list) => {})
    }
  );

  return (
    <TransferList
      {...selectApiReturn}
      customLabel={WorkSchemaPill}
      mah={'24em'}
    />
  );
}
