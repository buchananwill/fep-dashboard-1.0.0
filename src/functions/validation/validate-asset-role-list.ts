import { wrapListDataWithIndexId } from '@/functions/wrapListDataWithIndexId';
import { validateWithZod } from '@/functions/validateWithZod';
import { AssetRolePostRequestSchema } from '@/api/RolePostRequestSchemas';

export const validate = (unsafe: unknown) => {
  const safeList = validateWithZod(AssetRolePostRequestSchema.array())(unsafe);
  if (safeList) {
    return wrapListDataWithIndexId(safeList);
  } else {
    return null;
  }
};
