'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { usePathSelectionListener } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/selection/usePathSelectionListener';

export default function SelectionCallout() {
  const [path] = usePathSelectionListener('callout');
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const observerRef = useRef<{
    resizeObserver: ResizeObserver;
    mutationObserver: MutationObserver;
  } | null>(null);

  const updatePosition = useCallback((element: HTMLElement) => {
    if (element) {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setPosition({
        top: centerY,
        left: centerX
      });
    }
  }, []);

  useEffect(() => {
    let element: HTMLElement | null = null;

    if (path) {
      // Find the element with the data-id equal to the path
      element = document.querySelector(`[data-id='${path}']`);
      if (element) {
        const nonNull = element;
        // Initial position calculation
        updatePosition(element);

        // Set up a ResizeObserver to detect size changes
        const resizeObserver = new ResizeObserver(() =>
          updatePosition(nonNull)
        );
        resizeObserver.observe(element);

        // Set up a MutationObserver to detect changes in the 'd' attribute
        const mutationObserver = new MutationObserver((mutationsList) => {
          for (const mutation of mutationsList) {
            if (
              mutation.type === 'attributes' &&
              mutation.attributeName === 'd'
            ) {
              updatePosition(nonNull);
            }
          }
        });

        mutationObserver.observe(element, {
          attributes: true, // Observe attribute changes
          attributeFilter: ['d'] // Only observe changes to the 'd' attribute
        });

        // Store the observers in ref for cleanup
        observerRef.current = { resizeObserver, mutationObserver };
      }
    }

    return () => {
      // Clean up observers when the path changes or component unmounts
      if (observerRef.current) {
        observerRef.current.resizeObserver?.disconnect();
        observerRef.current.mutationObserver?.disconnect();
      }
    };
  }, [path]);

  const pathPresent = position.left !== 0 && position.top !== 0;

  // Render a colored circle at the computed position
  return pathPresent ? (
    <div
      style={{
        position: 'fixed', // Ensure the circle is positioned relative to the viewport
        opacity: 0.75,
        top: position.top,
        left: position.left,
        transform: 'translate(-50%, -50%)', // Center the circle at the position
        pointerEvents: 'none' // Allow clicks to pass through the circle
      }}
    >
      <div
        className={
          'animate-ping-slow h-8 w-8 animate-ping rounded-full border-4 border-white bg-transparent'
        }
      ></div>
    </div>
  ) : null;
}
