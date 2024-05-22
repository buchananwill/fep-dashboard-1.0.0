'use client';
import Joyride, { Step, TooltipRenderProps } from 'react-joyride';
import React, { forwardRef, useEffect, useState } from 'react';

const defaultOptions = {
  arrowColor: '#fff',
  backgroundColor: '#fff',
  beaconSize: 36,
  overlayColor: 'rgba(0, 0, 0, 0.6)',
  primaryColor: '#2756ff',
  spotlightShadow: '0 0 30px rgba(0, 0, 0, 0.5)',
  textColor: '#333',
  width: undefined,
  zIndex: 200
};

export default function JoyrideWrapper({ steps }: { steps: Step[] }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  return isClient ? <Joyride steps={steps} /> : null;
}
