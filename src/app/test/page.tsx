'use client';

import { useState } from 'react';
import { RgbaPicker } from '@/components/generic/RgbaPicker';

export default function Page() {
  const [divColor, setDivColor] = useState({ r: 255, g: 0, b: 0, a: 1 });

  return (
    <RgbaPicker value={divColor} onChange={setDivColor} showOpacity={true} />
  );
}
