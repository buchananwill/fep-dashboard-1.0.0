import { BaseLazyDtoUiProps, useDtoStore } from 'dto-stores';
import React, { ChangeEvent, Dispatch, SetStateAction, useMemo } from 'react';
import {
  CycleDto,
  CycleSubspanDto
} from '@/api/generated-types/generated-types';
import { EntityClassMap } from '@/api/entity-class-map';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { Badge, Checkbox } from '@mantine/core';

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
          label={`${i}`}
          key={i}
          checked={entity.sizesStartingAtCycleSubspanId.includes(i)}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleEntityUpdate(i, event.target.checked, dispatchWithoutControl)
          }
        />
      );
    }
    return checkBoxes;
  }, [dispatchWithoutControl, entity, cycle.cycleSubspanGroupSizes]);

  return (
    <tr>
      <td>
        <Badge className={'col-span-2'}>{entity.name}</Badge>
      </td>
      {checkBoxes.map((box, index) => (
        <td key={index}>{box}</td>
      ))}
    </tr>
  );
}
