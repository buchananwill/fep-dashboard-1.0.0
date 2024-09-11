import { SimpleSelectable } from '@/app/core/auto-scheduling/MultiSelect';
import Select, { OnChangeValue } from 'react-select';
import { FieldPath, FieldValues } from 'react-hook-form/dist/types';
import { Control } from 'react-hook-form';

export default function FixedOrderMultiSelect({
  options,
  currentOptions,
  onChange
}: {
  options: FixedOrderSelectable[];
  currentOptions: FixedOrderSelectable[];
  onChange: (
    selectedOptions: OnChangeValue<FixedOrderSelectable, true>
  ) => void;
}) {
  return (
    <Select
      // react-select props:
      isMulti
      options={options}
      value={currentOptions}
      onChange={onChange}
      closeMenuOnSelect={false}
      className={'w-full'}
    />
  );
}

export interface FixedOrderSelectable extends SimpleSelectable {
  position: number;
}

export type FormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
  control: Control<TFieldValues>;
} & {
  options: FixedOrderSelectable[];
  initialOptions: FixedOrderSelectable[];
};
