import { useCallback } from 'react';
import { notifications } from '@mantine/notifications';

/**
 * Validation function provided by the caller.
 * - Must return `null` if the data is invalid or cannot be recovered.
 * - Must return a valid instance of `T` or `T[]` if validation succeeds.
 * - The caller is responsible for handling validation failures (e.g., showing error messages or recovery).
 */
export function useUploadData<T>({
  dispatch,
  validate,
  type
}: UploadDataParams<T>) {
  return useCallback(
    async (file: File | File[] | null) => {
      try {
        let message = null;
        let color = 'blue';
        if (file === null) {
          message = 'No file selected.';
        }
        if (type === 'single' && file instanceof File) {
          const text = await file.text();
          const data = JSON.parse(text);
          const safeData = validate(data);
          if (safeData) {
            dispatch(safeData);
            message = `File uploaded: ${file.name}`;
            color = 'primary.5';
          }
        } else if (type === 'multiple' && Array.isArray(file)) {
          const strings = await Promise.all(file.map((each) => each.text()));
          const unsafeList = strings.map((text) => JSON.parse(text));
          const list = validate(unsafeList);
          if (list) {
            dispatch(list);
            message = `Files uploaded: ${file.map((each) => each.name).join(', ')}`;
            color = 'primary.5';
          }
        } else {
          throw new Error(
            'Incorrect number of files received for configured type.'
          );
        }
        if (message) {
          notifications.show({
            message,
            color
          });
        }
      } catch (e) {
        console.error({ e, file });
      }
    },
    [dispatch, validate, type]
  );
}

type UploadDataParamsSingle<T> = {
  validate: (unsafeData: unknown) => T | null;
  dispatch: (parsedData: T) => void;
  type: 'single';
};
type UploadDataParamsMultiple<T> = {
  validate: (unsafeData: unknown[]) => T[] | null;
  dispatch: (parsedData: T[]) => void;
  type: 'multiple';
};

export type UploadDataParams<T> =
  | UploadDataParamsSingle<T>
  | UploadDataParamsMultiple<T>;
