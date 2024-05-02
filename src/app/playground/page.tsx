'use client';

import { useState } from 'react';
import { Button } from '@nextui-org/button';

export default function Page() {
  const [translation, setTranslation] = useState({ x: 0, y: 0, z: 0 });

  const { x, y, z } = translation;

  return (
    <div
      style={{ transform: `translate3d(${x}px, ${y}px, ${z}px)` }}
      className={
        'flex flex-col w-40 justify-center align-middle items-center border-2 rounded-lg p-4'
      }
    >
      <span>Some text</span>
      <Button
        onPress={() =>
          setTranslation({ x: randomInt(500), y: randomInt(500), z: 0 })
        }
      >
        Teleport!
      </Button>
    </div>
  );
}

function randomInt(limit: number) {
  return Math.random() * limit;
}
