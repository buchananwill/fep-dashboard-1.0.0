import { PersonDto } from '@/api/generated-types/generated-types';
import { useFormContext } from 'react-hook-form';
import React, { useCallback } from 'react';
import {
  CalendarDate,
  getLocalTimeZone,
  parseAbsolute,
  parseDate,
  parseZonedDateTime,
  ZonedDateTime
} from '@internationalized/date';
import { ControlledInput } from '@/components/react-hook-form/ControlledInput';
import { DatePicker } from '@nextui-org/date-picker';
import { addHours, format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { NullableOption } from '@microsoft/microsoft-graph-types';

export type BaseEntity<T> = {
  baseEntity: T;
};

export function PersonNestedInForm() {
  const { control, watch, setValue } = useFormContext<BaseEntity<PersonDto>>();

  const dateOfBirth = watch('baseEntity.dateOfBirth');

  const setDateValue = useCallback(
    (value: ZonedDateTime) => {
      console.log(value);
      const dateOnly = format(value.toDate(), 'yyyy-MM-dd');
      console.log(dateOnly);
      setValue('baseEntity.dateOfBirth', dateOnly);
    },
    [setValue]
  );

  console.log(dateOfBirth);

  const currentDateTime = addHours(
    parseDate(dateOfBirth).toDate(getLocalTimeZone()),
    12
  );
  const nowFormatted = formatInTimeZone(
    currentDateTime,
    getLocalTimeZone(),
    "yyyy-MM-dd'T'HH:mm:ssXXX"
  );

  console.log(nowFormatted, new Date(nowFormatted));

  const zonedDateTime = parseAbsolute(nowFormatted, 'Europe/London');

  console.log(currentDateTime, zonedDateTime, getTimeZone(currentDateTime));

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
      <DatePicker
        name={'baseEntity.dateOfBirth'}
        aria-label={'Date of Birth'}
        label={'Date of Birth'}
        value={zonedDateTime}
        showMonthAndYearPickers={true}
        onChange={setDateValue}
      />
    </>
  );
}

export function getTimeZone(date: Date): NullableOption<string> {
  const zone = Intl.DateTimeFormat('en-GB', { timeZoneName: 'long' })
    .format(date)
    .split(', ')
    .pop();
  return zone === undefined ? null : zone;
}
