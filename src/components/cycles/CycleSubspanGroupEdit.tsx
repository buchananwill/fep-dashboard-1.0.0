import { BaseLazyDtoUiProps } from 'dto-stores';
import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { Checkbox } from '@nextui-org/checkbox';
import { Chip } from '@nextui-org/chip';
import { CycleSubspanDto } from '@/api/zod-schemas/CycleSubspanDtoSchema';

export interface CycleSubspanGroupEditDto extends CycleSubspanDto {
  sizesStartingAtCycleSubspanId: number[];
  maxGroupSize: number;
}

const handleEntityUpdate = (
  value: number,
  selected: boolean,
  dispatch?: Dispatch<SetStateAction<CycleSubspanGroupEditDto>>
) => {
  if (!dispatch) return;
  dispatch((entity) => {
    const { sizesStartingAtCycleSubspanId } = entity;
    if (!selected) {
      return {
        ...entity,
        sizesStartingAtCycleSubspanId: sizesStartingAtCycleSubspanId.filter(
          (included) => included !== value
        )
      };
    } else {
      return {
        ...entity,
        sizesStartingAtCycleSubspanId: [...sizesStartingAtCycleSubspanId, value]
      };
    }
  });
};

export default function CycleSubspanGroupEdit({
  dispatchWithoutControl,
  entity
}: BaseLazyDtoUiProps<CycleSubspanGroupEditDto>) {
  const checkBoxes = useMemo(() => {
    const checkBoxes: React.JSX.Element[] = [];
    for (let i = 1; i <= entity.maxGroupSize; i++) {
      checkBoxes.push(
        <Checkbox
          value={`${i}`}
          key={i}
          isSelected={entity.sizesStartingAtCycleSubspanId.includes(i)}
          onValueChange={(selected) =>
            handleEntityUpdate(i, selected, dispatchWithoutControl)
          }
        >
          {i}
        </Checkbox>
      );
    }
    return checkBoxes;
  }, [dispatchWithoutControl, entity]);

  return (
    <tr>
      <td>
        <Chip className={'col-span-2'}>{entity.name}</Chip>
      </td>
      {checkBoxes.map((box, index) => (
        <td key={index}>{box}</td>
      ))}
    </tr>
  );
}
