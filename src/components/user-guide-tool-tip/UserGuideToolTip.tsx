'use client';
import { useCallback, useMemo, useRef } from 'react';
import { useGlobalDispatch } from 'selective-context';
import {
  TooltipContext,
  TooltipContextInterface
} from '@/components/tooltip/TooltipSingleton';
import { useQuery } from '@tanstack/react-query';
import { Card, Loader } from '@mantine/core';
import { kebabCase } from 'lodash';
import { singular } from 'pluralize';
import { userGuideMarkdownToMarkdownString } from '@/app/user-guide/parseJsonTreeToMarkdown';
import Markdown from 'markdown-to-jsx';
import { Api } from '@/api/clientApi';

export function useUserGuideTooltip(htmlId: string) {
  const transformedId = useMemo(() => {
    return kebabCase(singular(htmlId)).toLowerCase();
  }, [htmlId]);
  console.log({ transformedId });
  const ref = useRef(null);
  const { dispatchWithoutListen: dispatchTooltip } =
    useGlobalDispatch<TooltipContextInterface>(TooltipContext);
  const onMouseOver = useCallback(() => {
    dispatchTooltip((state) => {
      return {
        ...state,
        isOpen: true,
        rootNodeRef: ref,
        content: <UserGuideBlockWrapper htmlId={transformedId} />,
        placement: 'bottom'
      };
    });
  }, [dispatchTooltip, ref, transformedId]);
  const onMouseOut = useCallback(() => {
    dispatchTooltip((state) => {
      return {
        ...state,
        isOpen: false
      };
    });
  }, [dispatchTooltip]);
  return { ref, onMouseOver, onMouseOut };
}

function UserGuideBlockWrapper({ htmlId }: { htmlId: string }) {
  const { data, isFetching } = useQuery({
    queryFn: async () =>
      Api.UserGuideMarkdown.getDtoListByExampleList([{ htmlId }]),
    queryKey: [htmlId]
  });

  const [markdownBlock] = data ?? [];

  return (
    <Card w={'var(--mantine-breakpoint-xs)'}>
      {isFetching ? (
        <Loader />
      ) : markdownBlock ? (
        <Markdown>{userGuideMarkdownToMarkdownString(markdownBlock)}</Markdown>
      ) : (
        'No content found!'
      )}
    </Card>
  );
}
