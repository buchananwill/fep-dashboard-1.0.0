'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const appRouterInstance = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    // console.error(error);
  }, [error]);

  return (
    <div>
      <h2>{error.message}</h2>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
