import {
  ReactNode,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState
} from 'react';
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
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { Reorder } from 'framer-motion';

type TransferListType = 'forward' | 'backward';

interface RenderListProps {
  options: string[];
  onTransfer: (options: string[]) => void;
  type: TransferListType;
  customLabel?: (props: TransferItemLabelProps) => ReactNode;
}

function RenderList({
  options,
  onTransfer,
  type,
  customLabel: CustomLabel
}: RenderListProps) {
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
    .map((item, index) => (
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
          {CustomLabel ? (
            <CustomLabel item={item} index={index} type={type} />
          ) : (
            <span>{item}</span>
          )}
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
              {type === 'forward' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
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

export type TransferItemLabelProps = {
  item: string;
  index: number;
  type: TransferListType;
};

export function TransferList({
  onChange,
  data,
  type,
  value,
  customLabel
}: MultiFlat & { customLabel?: (props: TransferItemLabelProps) => ReactNode }) {
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

  const handleReorder = useCallback(
    (update: SetStateAction<string[]>) => {
      if (!onChange) return;
      if (typeof update === 'function') {
        onChange(update(valueRef.current));
      } else {
        onChange(update);
      }
    },
    [onChange]
  );

  return (
    <div className={classes.root}>
      <RenderList
        type="forward"
        options={remainingOptions}
        onTransfer={(options) => handleTransfer(0, options)}
        customLabel={customLabel}
      />
      <Reorder.Group values={value} onReorder={handleReorder}>
        <RenderList
          type="backward"
          options={value}
          onTransfer={(options) => handleTransfer(1, options)}
          customLabel={customLabel}
        />
      </Reorder.Group>
    </div>
  );
}
