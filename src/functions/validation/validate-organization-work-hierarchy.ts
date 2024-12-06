import {
  CarouselOrderSummaryDtoSchema,
  CycleSubspanDefinitionDtoSchema,
  OrganizationWorkHierarchyDtoSchema,
  WorkSchemaNodeManualDefinitionDtoSchema
} from '@/api/generated-schemas/schemas_';
import {
  wrapDataListWithLabelAsId,
  wrapListDataWithIndexId
} from '@/functions/wrapListDataWithIndexId';
import { validateWithZod } from '@/functions/validateWithZod';

export const validate = (unsafe: unknown) => {
  const safeList = validateWithZod(OrganizationWorkHierarchyDtoSchema.array())(
    unsafe
  );
  if (safeList) {
    return wrapDataListWithLabelAsId(safeList, (owh) => {
      if (!owh) throw Error('Undefined element');
      else return owh.name;
    });
  } else {
    return null;
  }
};
