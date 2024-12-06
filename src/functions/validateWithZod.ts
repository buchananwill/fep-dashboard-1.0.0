import { z } from 'zod';
import { notifications } from '@mantine/notifications';

export function validateWithZod<T extends z.ZodTypeAny>(schema: T) {
  return (unsafeData: unknown) => {
    const safeOrErrors = schema.safeParse(unsafeData);
    if (safeOrErrors.success) {
      return safeOrErrors.data as z.infer<T>;
    } else {
      notifications.show({
        message: JSON.stringify(safeOrErrors, null, 2),
        color: 'red'
      });
      return null;
    }
  };
}