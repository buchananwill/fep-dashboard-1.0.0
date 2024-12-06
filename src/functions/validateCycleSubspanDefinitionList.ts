import { CycleSubspanDefinitionDtoSchema } from '@/api/generated-schemas/schemas_';
import { wrapListDataWithIndexId } from '@/functions/wrapListDataWithIndexId';
import { validateWithZod } from '@/functions/validateWithZod';

export const validate = (unsafe: unknown) => {
  const newVar = validateWithZod(CycleSubspanDefinitionDtoSchema.array())(
    unsafe
  );
  if (newVar) {
    return wrapListDataWithIndexId(newVar);
  } else {
    return null;
  }
};
