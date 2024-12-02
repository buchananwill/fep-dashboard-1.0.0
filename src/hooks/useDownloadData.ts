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
  const aRef = useRef<HTMLAnchorElement | null>(null);
  const handleDownload = useCallback(() => {
    if (aRef.current === null) {
      console.error({
        message: 'Download clicked before anchor rendered',
        getData,
        defaultName,
        type
      });
      return;
    }
    const blob = new Blob([getData()], { type });
    aRef.current.href = URL.createObjectURL(blob);
    aRef.current.download = defaultName;
    aRef.current.click();
    setTimeout(
      () => aRef.current && URL.revokeObjectURL(aRef.current.href),
      debounceRevoke
    );
  }, [getData, defaultName, type, debounceRevoke]);

  return { aRef, handleDownload };
}

export type DownloadDataParams<T extends BlobPart = BlobPart> = {
  getData: () => T;
  type?: string;
  defaultName?: string;
  debounceRevoke?: number;
};
