import { useCallback, useMemo, useRef, useState } from 'react';
import {
  ActionIcon,
  Checkbox,
  Combobox,
  Group,
  TextInput,
  useCombobox
} from '@mantine/core';
import classes from './TransferList.module.css';
import { MultiFlat } from '@/hooks/select-adaptors/selectApiTypes';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

interface RenderListProps {
  options: string[];
  onTransfer: (options: string[]) => void;
  type: 'forward' | 'backward';
}

function RenderList({ options, onTransfer, type }: RenderListProps) {
  const combobox = useCombobox();
  const [value, setValue] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const handleValueSelect = (val: string) =>
    setValue((current) =>
      current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val]
    );

  const items = options
    .filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()))
    .map((item) => (
      <Combobox.Option
        value={item}
        key={item}
        active={value.includes(item)}
        onMouseOver={() => combobox.resetSelectedOption()}
      >
        <Group gap="sm">
          <Checkbox
            checked={value.includes(item)}
            onChange={() => {}}
            aria-hidden
            tabIndex={-1}
            style={{ pointerEvents: 'none' }}
          />
          <span>{item}</span>
        </Group>
      </Combobox.Option>
    ));

  return (
    <div className={classes.renderList} data-type={type}>
      <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
        <Combobox.EventsTarget>
          <Group wrap="nowrap" gap={0} className={classes.controls}>
            <TextInput
              placeholder="Search groceries"
              classNames={{ input: classes.input }}
              value={search}
              onChange={(event) => {
                setSearch(event.currentTarget.value);
                combobox.updateSelectedOptionIndex();
              }}
            />
            <ActionIcon
              radius={0}
              variant="default"
              size={36}
              className={classes.control}
              onClick={() => {
                onTransfer(value);
                setValue([]);
              }}
            >
              <ChevronRightIcon className={'w-6'} />
            </ActionIcon>
          </Group>
        </Combobox.EventsTarget>

        <div className={classes.list}>
          <Combobox.Options>
            {items.length > 0 ? (
              items
            ) : (
              <Combobox.Empty>Nothing found....</Combobox.Empty>
            )}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  );
}

export function TransferList({ onChange, data, type, value }: MultiFlat) {
  const remainingOptions = useMemo(() => {
    const strings = new Set(value);
    return data.filter((item) => !strings.has(item));
  }, [value, data]);
  const valueRef = useRef(value);
  valueRef.current = value;

  const handleTransfer = useCallback(
    (direction: 0 | 1, options: string[]) => {
      let update = valueRef.current;
      if (direction === 0) {
        update = [...update, ...options];
      } else {
        update = valueRef.current.filter((str) => !options.includes(str));
      }
      onChange(update);
    },
    [onChange]
  );

  return (
    <div className={classes.root}>
      <RenderList
        type="forward"
        options={remainingOptions}
        onTransfer={(options) => handleTransfer(0, options)}
      />
      <RenderList
        type="backward"
        options={value}
        onTransfer={(options) => handleTransfer(1, options)}
      />
    </div>
  );
}
