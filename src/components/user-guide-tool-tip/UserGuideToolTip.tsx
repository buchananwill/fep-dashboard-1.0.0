'use client';
import { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react';
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
import { useSafeTrapezium } from '@/components/user-guide-tool-tip/useSafeTrapezium';
import { useIsPointInSafeZone } from '@/components/user-guide-tool-tip/useIsPointInSafeZone';

export function useUserGuideTooltip(htmlId: string) {
  const transformedId = useMemo(() => {
    return kebabCase(singular(htmlId)).toLowerCase();
  }, [htmlId]);

  const ref = useRef(null);
  const toolTipRef = useRef(null);
  const timeoutRef = useRef<number | null>(null);

  const getSafeTrapezium = useSafeTrapezium(ref, toolTipRef);

  const isPointInSafeZone = useIsPointInSafeZone(getSafeTrapezium);

  const { dispatchWithoutListen: dispatchTooltip } =
    useGlobalDispatch<TooltipContextInterface>(TooltipContext);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      const mousePoint = { x: event.clientX, y: event.clientY };

      const pointInSafeZone = isPointInSafeZone(mousePoint);
      console.log(pointInSafeZone);
      switch (pointInSafeZone) {
        case 'PARENT':
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
          break;
        case 'SAFE_TRAPEZIUM':
          if (!timeoutRef.current) {
            timeoutRef.current = window.setTimeout(() => {
              document.removeEventListener('mousemove', handleMouseMove);
              dispatchTooltip((state) => ({ ...state, isOpen: false }));
            }, 2000);
          }
          break;
        case 'EXTERNAL':
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
          document.removeEventListener('mousemove', handleMouseMove);
          dispatchTooltip((state) => ({ ...state, isOpen: false }));
          break;
        case 'CHILD': {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      }
    },
    [isPointInSafeZone, dispatchTooltip]
  );

  const onMouseOver = useCallback(() => {
    dispatchTooltip((state) => {
      return {
        ...state,
        isOpen: true,
        rootNodeRef: ref,
        content: (
          <UserGuideBlockWrapper htmlId={transformedId} ref={toolTipRef} />
        ),
        placement: 'bottom'
      };
    });
    document.addEventListener('mousemove', handleMouseMove);
  }, [dispatchTooltip, ref, transformedId, handleMouseMove]);

  const onMouseOut = useCallback(() => {}, []);

  return { ref, onMouseOver, onMouseOut };
}

const UserGuideBlockWrapper = forwardRef<HTMLDivElement, { htmlId: string }>(
  function InnerBlock({ htmlId }, ref) {
    const { data, isFetching } = useQuery({
      queryFn: async () =>
        Api.UserGuideMarkdown.getDtoListByExampleList([{ htmlId }]),
      queryKey: [htmlId]
    });

    const [markdownBlock] = data ?? [];

    return (
      <Card ref={ref} w={'var(--mantine-breakpoint-xs)'}>
        {isFetching ? (
          <Loader />
        ) : markdownBlock ? (
          <Markdown>
            {userGuideMarkdownToMarkdownString(markdownBlock)}
          </Markdown>
        ) : (
          'No content found!'
        )}
      </Card>
    );
  }
);

type MouseLocations =
  | 'PARENT'
  | 'SAFE_TRAPEZIUM'
  | 'CHILD'
  | 'NOT_PARENT'
  | 'NOT_SAFE';
