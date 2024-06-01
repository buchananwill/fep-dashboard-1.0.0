import { useRef } from 'react';

export function useUuidListenerKey() {
  return useRef(crypto.randomUUID()).current;
}