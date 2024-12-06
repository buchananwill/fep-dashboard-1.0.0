import {
  CarouselOrderSummaryDtoSchema,
  CycleSubspanDefinitionDtoSchema
} from '@/api/generated-schemas/schemas_';
import { wrapListDataWithIndexId } from '@/functions/wrapListDataWithIndexId';
import { validateWithZod } from '@/functions/validateWithZod';

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
