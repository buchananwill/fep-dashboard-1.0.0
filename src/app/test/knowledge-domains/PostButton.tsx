'use client';
import { Button } from '@mantine/core';
import { postAutoCarouselGroupOptions } from '@/app/test/auto-carousel-group-options/post-auto-carousel-group-options';
import { postKnowledgeDomains } from '@/app/test/knowledge-domains/post-knowledge-domains';

export default function PostButton({ rowCopies }: { rowCopies: any[] }) {
  console.log(rowCopies);
  return (
    <Button
      classNames={{ root: 'block' }}
      onClick={() => {
        console.log(rowCopies);
        postKnowledgeDomains(rowCopies);
      }}
    >
      POST
    </Button>
  );
}
