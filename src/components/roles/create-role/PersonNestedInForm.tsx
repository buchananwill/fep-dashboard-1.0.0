'use client';
import { PersonDto } from '@/api/generated-types/generated-types';
import { useFormContext } from 'react-hook-form';
import React, { useCallback, useState } from 'react';
import { ControlledInput } from '@/components/react-hook-form/ControlledInput';
import { DatePicker, DatePickerInput, DateValue } from '@mantine/dates';

export type BaseEntity<T> = {
  baseEntity: T;
};

export function PersonNestedInForm() {
  const { control, watch, setValue } = useFormContext<BaseEntity<PersonDto>>();

  const dateOfBirth = watch('baseEntity.dateOfBirth');

  const setDateValue = useCallback(
    (value: DateValue) => {
      const isoString = value?.toString();
      if (isoString) setValue('baseEntity.dateOfBirth', isoString);
    },
    [setValue]
  );

  const dateValue = new Date(dateOfBirth);

  return (
    <>
      <h1>Person</h1>
      <ControlledInput
        name={'baseEntity.fName'}
        aria-label={'First Name'}
        label={'First Name'}
        placeholder={'Enter first name'}
        autoComplete={'on'}
      />
      <ControlledInput
        name={'baseEntity.lName'}
        aria-label={'Last Name'}
        label={'Last Name'}
        placeholder={'Enter last name'}
        autoComplete={'on'}
      />
      <DatePickerInput
        label={'Date of Birth'}
        value={dateValue}
        onChange={setDateValue}
        aria-label={'Date of Birth'}
      />
    </>
  );
}
