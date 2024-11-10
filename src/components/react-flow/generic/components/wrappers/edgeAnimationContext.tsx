'use client';
import { createContext, PropsWithChildren, useContext } from 'react';

export type EdgeAnimationContextType = {
  direction?: 'to-source' | 'to-target';
};

const EdgeAnimationContext = createContext<EdgeAnimationContextType>({
  direction: 'to-source'
});

export function EdgeAnimationContextProvider({
  currentContext,
  children
}: { currentContext: EdgeAnimationContextType } & PropsWithChildren) {
  return (
    <EdgeAnimationContext.Provider value={currentContext}>
      {children}
    </EdgeAnimationContext.Provider>
  );
}

export function useEdgeAnimationDirection() {
  return useContext(EdgeAnimationContext).direction;
}
