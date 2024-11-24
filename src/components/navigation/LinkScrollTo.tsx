'use client';
import {
  ComponentPropsWithoutRef,
  MouseEvent,
  useCallback,
  useEffect,
  useRef
} from 'react';
import Link from 'next/link';

export function LinkScrollTo({
  href,
  onClick: overriddenHandler,
  ...props
}: ComponentPropsWithoutRef<'a'>) {
  const linkTargetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (href && href.startsWith('#')) {
      let identity = href;
      while (identity.startsWith('#')) {
        identity = identity.slice(1);
      }
      const element = document.getElementById(identity) ?? null;
      console.log(element);
      linkTargetRef.current = element;
      return () => {
        linkTargetRef.current = null;
      };
    }
  }, [href]);

  const onClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    console.log("Scrollin'!");
    event.preventDefault();
    if (linkTargetRef.current) {
      linkTargetRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  return href && <Link href={href} {...props} onClick={onClick} />;
}
