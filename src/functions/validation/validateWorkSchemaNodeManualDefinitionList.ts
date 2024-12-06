import {
  CarouselOrderSummaryDtoSchema,
  CycleSubspanDefinitionDtoSchema,
  WorkSchemaNodeManualDefinitionDtoSchema
} from '@/api/generated-schemas/schemas_';
import {
  wrapDataListWithLabelAsId,
  wrapListDataWithIndexId
} from '@/functions/wrapListDataWithIndexId';
import { validateWithZod } from '@/functions/validateWithZod';

export const validate = (unsafe: unknown) => {
  const safeList = validateWithZod(
    WorkSchemaNodeManualDefinitionDtoSchema.array()
  )(unsafe);
  if (safeList) {
    return wrapDataListWithLabelAsId(safeList, (wsn) => {
      if (!wsn) throw Error('Undefined element');
      else return wsn.name;
    });
  } else {
    return null;
  }
};
