import { BaseLazyDtoUiProps, useDtoStore } from 'dto-stores';
import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { Checkbox } from '@nextui-org/checkbox';
import { Chip } from '@nextui-org/chip';
import { CycleSubspanDto } from '@/api/zod-schemas/CycleSubspanDtoSchema';
import { EntityClassMap } from '@/api/entity-class-map';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { CycleDto } from '@/api/generated-types/generated-types';

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
  const listenerKey = useUuidListenerKey();
  const { entity: cycle } = useDtoStore<CycleDto>({
    entityId: entity.parentCycleId,
    entityClass: EntityClassMap.cycle,
    listenerKey
  });

  const checkBoxes = useMemo(() => {
    const checkBoxes: React.JSX.Element[] = [];
    const cycleSubspanGroupSizes = cycle.cycleSubspanGroupSizes;
    for (let i of cycleSubspanGroupSizes) {
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
  }, [dispatchWithoutControl, entity, cycle.cycleSubspanGroupSizes]);

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
