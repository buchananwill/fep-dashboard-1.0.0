'use client';
import { Button } from '@mantine/core';
import { postAutoCarouselGroupOptions } from '@/app/test/auto-carousel-group-options/post-auto-carousel-group-options';

export default function PostButton({ rowCopies }: { rowCopies: any[] }) {
  return (
    <Button
      classNames={{ root: 'block' }}
      onClick={() => {
        postAutoCarouselGroupOptions(rowCopies);
      }}
    >
      POST
    </Button>
  );
}
