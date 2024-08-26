'use client';
import React, { useEffect, useState } from 'react';
import { usePathSelectionListener } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/selection/usePathSelectionListener';

export default function SelectionCallout() {
  const [path] = usePathSelectionListener('callout');
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (path) {
      // Find the element with the data-id equal to the path
      const element = document.querySelector(`[data-id='${path}']`);

      if (element) {
        // Get the bounding rectangle of the element
        const rect = element.getBoundingClientRect();
        // Calculate the center of the element
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Update the position state
        setPosition({
          top: centerY,
          left: centerX
        });
      }
    }
  }, [path]); // Re-run the effect when `path` changes

  // Render a colored circle at the computed position
  return (
    <div
      style={{
        position: 'fixed', // Ensure the circle is positioned relative to the viewport
        top: position.top,
        left: position.left,
        width: '20px',
        height: '20px',
        backgroundColor: 'red', // Color of the circle
        borderRadius: '50%', // Make it a circle
        transform: 'translate(-50%, -50%)', // Center the circle at the position
        pointerEvents: 'none' // Allow clicks to pass through the circle
      }}
    />
  );
}
