import { useCallback, useRef } from 'react';
/**
 * Currently has no error checking or validation.
 * */
export function useDownloadData<T extends BlobPart = BlobPart>({
  getData,
  defaultName = 'data.json',
  type = 'application/json',
  debounceRevoke = 200
}: DownloadDataParams<T>) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const onClick = useCallback(() => {
    if (ref.current === null) {
      console.error({
        message: 'Download clicked before anchor rendered',
        getData,
        defaultName,
        type
      });
      return;
    }
    const blob = new Blob([getData()], { type });
    ref.current.href = URL.createObjectURL(blob);
    ref.current.download = defaultName;
    ref.current.click();
    setTimeout(
      () => ref.current && URL.revokeObjectURL(ref.current.href),
      debounceRevoke
    );
  }, [getData, defaultName, type, debounceRevoke]);

  return { ref, onClick };
}

export type DownloadDataParams<T extends BlobPart = BlobPart> = {
  getData: () => T;
  type?: string;
  defaultName?: string;
  debounceRevoke?: number;
};
