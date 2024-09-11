import { useState } from 'react';
import Select, { OnChangeValue } from 'react-select';

export interface SimpleSelectable {
  label: string;
  value: string;
}

export function MultiSelect({
  options,
  initialOptions
}: {
  options: SimpleSelectable[];
  initialOptions: SimpleSelectable[];
}) {
  const [selected, setSelected] =
    useState<readonly SimpleSelectable[]>(initialOptions);

  const onChange = (selectedOptions: OnChangeValue<SimpleSelectable, true>) =>
    setSelected(selectedOptions);

  return (
    <Select
      // react-select props:
      isMulti
      options={options}
      value={selected}
      onChange={onChange}
      closeMenuOnSelect={false}
    />
  );
}
