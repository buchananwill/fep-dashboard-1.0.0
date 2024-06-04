import { HasId } from '@/api/main';

import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useCallback
} from 'react';
import { BaseLazyDtoUiProps } from 'dto-stores';
import clsx from 'clsx';

export type NumberPropertyKey<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

export type BaseDtoStoreNumberInputProps<T extends HasId> = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type' & 'value' & 'onChange'
> & {
  numberKey: NumberPropertyKey<T>;
};

export function DtoStoreNumberInput<T extends HasId>({
  entity,
  numberKey,
  className,
  dispatchWithoutControl,
  ...inputProps
}: BaseDtoStoreNumberInputProps<T> & BaseLazyDtoUiProps<T>) {
  const update = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (dispatchWithoutControl === undefined) {
        console.log('no dispatch defined!');
        return;
      }
      const numberValue = parseInt(e.target.value);
      dispatchWithoutControl((entity: T) => {
        const updated: T = { ...entity };
        (updated as any)[numberKey] = isNaN(numberValue) ? 0 : numberValue;
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
      value={entity[numberKey] as number}
      onChange={(e) => update(e)}
      className={clsx(className, 'number-input')}
      aria-label={inputProps['aria-label'] ?? String(numberKey)}
    />
  );
}
