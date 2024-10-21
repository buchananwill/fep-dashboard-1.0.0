'use client';

import { useRouter } from 'next/navigation';
import {
  createContext,
  MouseEventHandler,
  PropsWithChildren,
  use,
  useCallback,
  useTransition
} from 'react';

export const DELAY = 10;

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), ms));
const noop = () => {};

type TransitionContext = {
  pending: boolean;
  navigate: (url: string) => void;
};
const Context = createContext<TransitionContext>({
  pending: false,
  navigate: noop
});
export const usePageTransition = () => use(Context);
export const usePageTransitionHandler = () => {
  const { navigate } = usePageTransition();
  const onClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href) navigate(href);
  };

  return onClick;
};

type Props = PropsWithChildren<{
  className?: string;
}>;

export default function Transitions({ children, className }: Props) {
  const [pending, start] = useTransition();
  const router = useRouter();
  const navigate = useCallback(
    (href: string) => {
      start(async () => {
        router.push(href);
        await sleep(DELAY);
      });
    },
    [router]
  );

  const onClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      const a = (e.target as Element).closest('a');
      if (a) {
        e.preventDefault();
        const href = a.getAttribute('href');
        if (href) navigate(href);
      }
    },
    [navigate]
  );

  return (
    <Context.Provider value={{ pending, navigate }}>
      <div onClickCapture={onClick} className={className}>
        {children}
      </div>
    </Context.Provider>
  );
}
