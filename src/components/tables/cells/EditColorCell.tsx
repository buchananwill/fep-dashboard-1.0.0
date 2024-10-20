import { NextUiCellComponentProps } from '@/components/tables/GetCellRenderFunction';
import { ColorDto } from '@/api/generated-types/generated-types';
import { HasId } from '@/api/types';
import { useDtoStoreDispatch } from 'dto-stores';
import { SetStateAction, useCallback } from 'react';
import { fallBackColor, RgbaPicker } from '@/components/generic/RgbaPicker';
import { RgbaDto } from '@/components/tables/edit-tables/parseToCssRgba';
import { Button } from '@nextui-org/button';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { idDecrementer } from '@/components/work-schema-node-assignments/enrollment-table/GetNextIdDecrement';
import { DispatchState } from '@/types';
import { SetRequired } from 'type-fest';

export interface OptionallyHasColorDto extends HasId {
  color?: ColorDto;
}

type HasColorDto = SetRequired<OptionallyHasColorDto, 'color'>;

export default function EditColorCell<T extends OptionallyHasColorDto>({
  entityClass,
  path,
  entity
}: NextUiCellComponentProps<T>) {
  if (path !== 'color')
    throw Error('Must be used with directly-nested color property');

  const { dispatchWithoutListen: dispatch } = useDtoStoreDispatch<T>(
    entity.id,
    entityClass
  );

  if (entity.color) {
    return (
      <EditColor
        dispatch={dispatch as DispatchState<HasColorDto>}
        entity={entity as HasColorDto}
      />
    );
  } else return <AddColor dispatch={dispatch} entity={entity} />;
}

function EditColor<T extends SetRequired<OptionallyHasColorDto, 'color'>>({
  dispatch,
  entity
}: {
  dispatch: DispatchState<T>;
  entity: T;
}) {
  const updateColor = useCallback(
    (colorDispatch: SetStateAction<RgbaDto>) => {
      dispatch((prev) => {
        let updatedColor = prev.color ?? {
          ...fallBackColor,
          name: 'New color',
          id: idDecrementer()
        };
        if (typeof colorDispatch === 'function') {
          const { r, g, b, a, ...otherProps } = updatedColor;
          updatedColor = { ...colorDispatch({ r, g, b, a }), ...otherProps };
        } else if (typeof colorDispatch === 'object') {
          updatedColor = { ...updatedColor, ...colorDispatch };
        } else {
          throw Error('Incorrect dispatch content');
        }
        return { ...prev, color: updatedColor };
      });
    },
    [dispatch]
  );

  return (
    <RgbaPicker
      value={entity.color}
      onChange={updateColor}
      showOpacity={false}
    />
  );
}

function AddColor<T extends OptionallyHasColorDto>({
  dispatch,
  entity
}: {
  dispatch: DispatchState<T>;
  entity: T;
}) {
  const handleAddColor = useCallback(() => {
    dispatch((prev) => ({
      ...prev,
      color: { ...fallBackColor, name: '', id: idDecrementer() }
    }));
  }, [dispatch]);

  return (
    <Button isIconOnly className={'h-8 w-8 p-1'} onPress={handleAddColor}>
      <PlusCircleIcon />
    </Button>
  );
}
