'use client';

import { PropsWithChildren } from 'react';
import { TextAccessorContext } from '@/components/providers/text-accessor-context/textAccessorContextCreator';
import { HasNameDto } from '@/app/api/dtos/HasNameDtoSchema';

export default function NameAccessorContextProvider<T extends HasNameDto>({
  children
}: PropsWithChildren) {
  return (
    <TextAccessorContext.Provider value={{ accessor: (entity) => entity.name }}>
      {children}
    </TextAccessorContext.Provider>
  );
}
