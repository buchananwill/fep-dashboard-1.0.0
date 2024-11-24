'use client';

import { Affix, Button } from '@mantine/core';
import { ArrowUpIcon } from '@heroicons/react/24/outline';
import { useCallback, useEffect, useRef } from 'react';
import { MainScrollPortId } from '@/components/generic/MainScrollPort';

export function ScrollToTop() {
  const mainScrollPort = useRef<HTMLElement | null>(null);

  useEffect(() => {
    mainScrollPort.current = document.getElementById(MainScrollPortId) ?? null;
    return () => {
      mainScrollPort.current = null;
    };
  }, []);

  const onClick = useCallback(() => {
    if (mainScrollPort.current) {
      mainScrollPort.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Button
        rightSection={<ArrowUpIcon className={'w-6'} />}
        color={'primary'}
        onClick={onClick}
      >
        Back to Top
      </Button>
    </Affix>
  );
}
