'use client';
import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useCallback,
  useMemo
} from 'react';
import {
  BaseDtoUiProps,
  BaseLazyDtoUiProps,
  DtoUiWrapper,
  DtoUiWrapperProps,
  Entity
} from 'dto-stores';
import clsx from 'clsx';
import { removeLeadingZeroStringConversion } from '@/components/generic/removeLeadingZeroStringConversion';
import { HasId } from '@/api/types';

export type NumberPropertyKey<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

export interface ConditionalNumberClassName {
  startAt: number;
  className: string;
}

export type BaseDtoStoreNumberInputProps<T extends HasId> = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type' & 'value' & 'onChange'
> & {
  numberKey: NumberPropertyKey<T>;
  allowFloat?: boolean;
  conditionalValueClassNames?: ConditionalNumberClassName[];
} & Partial<Pick<BaseDtoUiProps<T>, 'dispatchDeletion' | 'deleted'>>;

export type MergedDtoStoreNumberInputProps<T extends HasId> =
  BaseDtoStoreNumberInputProps<T> & BaseLazyDtoUiProps<T>;

export function DtoStoreNumberInput<T extends HasId>({
  entity,
  numberKey,
  className,
  dispatchWithoutControl,
  entityClass,
  dispatchDeletion,
  deleted,
  allowFloat = false,
  conditionalValueClassNames,
  ...inputProps
}: MergedDtoStoreNumberInputProps<T>) {
  const { max, min } = inputProps;
  const update = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (dispatchWithoutControl === undefined) {
        console.log('no dispatch defined!');
        return;
      }
      let numberValue = allowFloat
        ? parseFloat(e.target.value)
        : parseInt(e.target.value, 10);
      const minNum = typeof min === 'number' ? min : parseInt(min ?? '0');
      const maxNum = typeof max === 'number' ? max : parseInt(max ?? '0');

      if (isNaN(numberValue)) numberValue = 0; // Default to 0 if not a number
      if (max) numberValue = Math.min(maxNum, numberValue);
      if (min) numberValue = Math.max(minNum, numberValue);
      dispatchWithoutControl((entity: T) => {
        const updated: T = { ...entity };
        (updated as any)[numberKey] = numberValue;
        return updated;
      });
    },
    [dispatchWithoutControl, numberKey, min, max, allowFloat]
  );

  const currentNumberValue = entity ? (entity[numberKey] as number) : 0;
  const rangeClassName = useMemo(() => {
    let conditionalClass = '';
    if (!conditionalValueClassNames) return conditionalClass;
    for (let { startAt, className } of conditionalValueClassNames) {
      if (currentNumberValue >= startAt) conditionalClass = className;
      else break;
    }
    return conditionalClass;
  }, [conditionalValueClassNames, currentNumberValue]);

  if (entity === undefined) return null;

  return (
    <input
      {...inputProps}
      type={'number'}
      inputMode={'numeric'}
      pattern={'[0-9]'}
      value={removeLeadingZeroStringConversion(currentNumberValue, allowFloat)}
      onChange={(e) => update(e)}
      className={clsx(className, 'number-input', rangeClassName)}
      aria-label={inputProps['aria-label'] ?? String(numberKey)}
    />
  );
}

export function DtoStoreNumberInputWrapper<T extends HasId>(
  props: Omit<DtoUiWrapperProps<T, BaseDtoStoreNumberInputProps<T>>, 'renderAs'>
) {
  return (
    <DtoUiWrapper<T, BaseDtoStoreNumberInputProps<T>>
      {...props}
      renderAs={DtoStoreNumberInput}
    />
  );
}
