import {
  PropsWithChildren,
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
  ScrollArea,
  TextInput,
  useCombobox
} from '@mantine/core';
import classes from './TransferList.module.css';
import { MultiFlat } from '@/hooks/select-adaptors/selectApiTypes';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { motion, Reorder } from 'framer-motion';

type TransferListType = 'forward' | 'backward';

interface RenderListProps {
  options: string[];
  onTransfer: (options: string[]) => void;
  type: TransferListType;
  customLabel?: (props: TransferItemLabelProps) => ReactNode;
  placeholder?: string;
  mah?: React.CSSProperties['maxHeight'];
}

function Wrapper({
  children,
  type,
  item
}: PropsWithChildren & { type: TransferListType; item: string }) {
  return type === 'forward' ? (
    <motion.div layout>{children}</motion.div>
  ) : (
    <Reorder.Item value={item} as={'div'} className={'p-0'}>
      {children}
    </Reorder.Item>
  );
}

function RenderList({
  options,
  onTransfer,
  type,
  customLabel: CustomLabel,
  placeholder = 'Search',
  mah
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
        p={0}
      >
        <Group gap="xs">
          <Checkbox
            checked={value.includes(item)}
            onChange={() => {}}
            aria-hidden
            tabIndex={-1}
            style={{ pointerEvents: 'none' }}
          />
          <Wrapper item={item} type={type}>
            {CustomLabel ? (
              <CustomLabel item={item} index={index} type={type} />
            ) : (
              <span>{item}</span>
            )}
          </Wrapper>
        </Group>
      </Combobox.Option>
    ));

  return (
    <div className={classes.renderList} data-type={type}>
      <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
        <Combobox.EventsTarget>
          <Group
            wrap="nowrap"
            gap={0}
            className={classes.controls}
            grow
            preventGrowOverflow={false}
          >
            <TextInput
              placeholder={placeholder}
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
          <ScrollArea.Autosize mah={mah} w={'24em'}>
            <Combobox.Options>
              {items.length > 0 ? (
                items
              ) : (
                <Combobox.Empty>Nothing found....</Combobox.Empty>
              )}
            </Combobox.Options>
          </ScrollArea.Autosize>
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
  customLabel,
  placeholderBackward,
  placeholderForward,
  mah
}: MultiFlat & {
  customLabel?: (props: TransferItemLabelProps) => ReactNode;
  placeholderForward?: string;
  placeholderBackward?: string;
  mah?: RenderListProps['mah'];
}) {
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
        placeholder={placeholderForward}
        mah={mah}
      />
      <Reorder.Group values={value} onReorder={handleReorder}>
        <RenderList
          type="backward"
          options={value}
          onTransfer={(options) => handleTransfer(1, options)}
          customLabel={customLabel}
          placeholder={placeholderBackward}
          mah={mah}
        />
      </Reorder.Group>
    </div>
  );
}
