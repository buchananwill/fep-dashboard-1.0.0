import {
  CarouselOrderSummaryDtoSchema,
  CycleSubspanDefinitionDtoSchema
} from '@/api/generated-schemas/schemas_';
import { wrapListDataWithIndexId } from '@/functions/wrapListDataWithIndexId';
import { validateWithZod } from '@/components/tables/edit-tables/validateWithZod';

export const validate = (unsafe: unknown) => {
  const safeList = validateWithZod(CarouselOrderSummaryDtoSchema.array())(
    unsafe
  );
  if (safeList) {
    return safeList;
  } else {
    return null;
  }
};
