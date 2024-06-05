import { HasId } from '@/api/main';

import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useCallback
} from 'react';
import { BaseDtoUiProps, BaseLazyDtoUiProps } from 'dto-stores';
import clsx from 'clsx';
import { removeLeadingZeroStringConversion } from '@/components/generic/removeLeadingZeroStringConversion';

export type NumberPropertyKey<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

export type BaseDtoStoreNumberInputProps<T extends HasId> = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type' & 'value' & 'onChange'
> & {
  numberKey: NumberPropertyKey<T>;
} & Partial<Pick<BaseDtoUiProps<T>, 'dispatchDeletion' | 'deleted'>>;

export function DtoStoreNumberInput<T extends HasId>({
  entity,
  numberKey,
  className,
  dispatchWithoutControl,
  entityClass,
  dispatchDeletion,
  deleted,
  ...inputProps
}: BaseDtoStoreNumberInputProps<T> & BaseLazyDtoUiProps<T>) {
  const update = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (dispatchWithoutControl === undefined) {
        console.log('no dispatch defined!');
        return;
      }
      let numberValue = parseInt(e.target.value, 10);
      if (isNaN(numberValue)) numberValue = 0; // Default to 0 if not a number

      dispatchWithoutControl((entity: T) => {
        const updated: T = { ...entity };
        (updated as any)[numberKey] = numberValue;
        return updated;
      });
    },
    [dispatchWithoutControl, numberKey]
  );

  if (entity === undefined) return null;

  return (
    <input
      {...inputProps}
      type={'number'}
      inputMode={'numeric'}
      pattern={'[0-9]'}
      value={removeLeadingZeroStringConversion(entity[numberKey] as number)}
      onChange={(e) => update(e)}
      className={clsx(className, 'number-input')}
      aria-label={inputProps['aria-label'] ?? String(numberKey)}
    />
  );
}
