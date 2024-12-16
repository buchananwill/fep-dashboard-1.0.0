import { wrapListDataWithIndexId } from '@/functions/wrapListDataWithIndexId';
import { validateWithZod } from '@/functions/validateWithZod';
import {
  AssetRolePostRequestSchema,
  ProviderRolePostRequestSchema
} from '@/api/RolePostRequestSchemas';

export const validate = (unsafe: unknown) => {
  const safeList = validateWithZod(ProviderRolePostRequestSchema.array())(
    unsafe
  );
  if (safeList) {
    return wrapListDataWithIndexId(safeList);
  } else {
    return null;
  }
};
