'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useCallback, useTransition } from 'react';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { Button } from '@nextui-org/button';
import { PersonDto } from '@/api/generated-types/generated-types';
import { PersonDtoSchema } from '@/api/zod-schemas/PersonDtoSchema';
import { ControlledInput } from '@/components/react-hook-form/ControlledInput';
import { DatePicker } from '@nextui-org/date-picker';
import {
  CalendarDate,
  getLocalTimeZone,
  parseDate
} from '@internationalized/date';

const defaultPersonValues = {
  id: -1,
  personalName: '',
  familyName: '',
  dateOfBirth: '1985-12-25'
};

export default function CreatePersonForm({
  createPersonAction,
  redirectUrl
}: {
  createPersonAction?: (person: PersonDto) => Promise<any>;
  redirectUrl: string;
}) {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue
  } = useForm<PersonDto>({
    resolver: zodResolver(PersonDtoSchema),
    defaultValues: defaultPersonValues
  });

  const appRouterInstance = useRouter();
  const [pending, startTransition] = useTransition();
  const dateOfBirth = watch('dateOfBirth');

  const setDateValue = useCallback(
    (value: CalendarDate) => {
      const isoString = value
        .toDate(getLocalTimeZone())
        .toISOString()
        .split('T')[0];
      setValue('dateOfBirth', isoString);
    },
    [setValue]
  );

  const onSubmit: SubmitHandler<PersonDto> = async (data) => {
    startTransition(async () => {
      if (createPersonAction) {
        await createPersonAction(data);
        // Handle post-submit actions, e.g., redirect to a different page
        appRouterInstance.push(redirectUrl);
      } else {
        console.error('No submission action supplied');
      }
    });
  };

  return (
    <Card className={'mt-8 w-64'}>
      <PendingOverlay pending={pending} />
      <form
        onSubmit={(event) => {
          console.warn(errors);
          handleSubmit(onSubmit)(event);
        }}
      >
        <CardHeader className={'items-center justify-center align-middle '}>
          New Person
        </CardHeader>
        <CardBody className={'items-center justify-center gap-2'}>
          <ControlledInput
            name={'personalName'}
            control={control}
            aria-label={'Personal Name'}
            label={'Personal Name'}
            placeholder={'Enter personal name'}
          />
          <ControlledInput
            name={'familyName'}
            control={control}
            aria-label={'Family Name'}
            label={'Family Name'}
            placeholder={'Enter family name'}
          />

          <DatePicker
            name={'dateOfBirth'}
            aria-label={'Date of Birth'}
            label={'Date of Birth'}
            value={parseDate(dateOfBirth)}
            showMonthAndYearPickers={true}
            onChange={setDateValue}
          />
        </CardBody>
        <CardFooter className={'justify-center'}>
          <Button type={'submit'}>Submit</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
