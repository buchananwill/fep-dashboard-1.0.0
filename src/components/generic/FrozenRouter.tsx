'use client';
import { PropsWithChildren, useContext, useRef } from 'react';

import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export function FrozenRouter(props: PropsWithChildren<{}>) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;
  console.log({ context, frozen });
  return (
    <LayoutRouterContext.Provider value={frozen}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}
