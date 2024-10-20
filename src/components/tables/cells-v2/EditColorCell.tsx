import { ColorDto } from '@/api/generated-types/generated-types';
import { HasId } from '@/api/types';
import { SetStateAction, useCallback, useRef } from 'react';
import { fallBackColor, RgbaPicker } from '@/components/generic/RgbaPicker';
import { RgbaDto } from '@/components/tables/edit-tables/parseToCssRgba';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { idDecrementer } from '@/components/work-schema-node-assignments/enrollment-table/GetNextIdDecrement';
import { SetRequired } from 'type-fest';
import { Button } from '@mantine/core';
import { InnerCellProps } from '@/components/tables/core-table-types';

interface OptionallyHasColorDto extends HasId {
  color?: ColorDto;
}

type HasColorDto = SetRequired<OptionallyHasColorDto, 'color'>;

export default function EditColorCell({
  onChange,
  value
}: InnerCellProps<ColorDto | undefined>) {
  if (value) {
    return <EditColor onChange={onChange} value={value} />;
  } else return <AddColor onChange={onChange} value={value} />;
}

function EditColor({ value, onChange }: InnerCellProps<ColorDto>) {
  const valueRef = useRef(value);
  valueRef.current = value;
  const updateColor = useCallback(
    (colorDispatch: SetStateAction<RgbaDto>) => {
      if (!onChange) return;
      let updatedColor = valueRef.current;
      if (typeof colorDispatch === 'function') {
        const { r, g, b, a, ...otherProps } = updatedColor;
        updatedColor = { ...colorDispatch({ r, g, b, a }), ...otherProps };
      } else if (typeof colorDispatch === 'object') {
        updatedColor = { ...updatedColor, ...colorDispatch };
      } else {
        throw Error('Incorrect dispatch content');
      }
      onChange(updatedColor);
    },
    [onChange]
  );

  return (
    <RgbaPicker value={value} onChange={updateColor} showOpacity={false} />
  );
}

function AddColor({ onChange }: InnerCellProps<ColorDto | undefined>) {
  const handleAddColor = useCallback(() => {
    console.log(onChange);
    if (onChange) onChange({ ...fallBackColor, name: '', id: idDecrementer() });
  }, [onChange]);

  return (
    <Button
      onClick={handleAddColor}
      size={'compact-md'}
      styles={{ root: { width: 'fit-content', padding: '0.25em' } }}
    >
      <PlusCircleIcon className={'h-6 w-6'} />
    </Button>
  );
}
