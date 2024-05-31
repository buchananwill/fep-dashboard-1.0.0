import { createContext } from "react";

interface AnimationSync {
  sineLut: number[];
}

export const createSineLut = () => {
  const sineLut: number[] = [];
  for (let i = 0; i < 360; i++) {
    sineLut.push(Math.sin((i / 360) * 2 * Math.PI));
  }
  return sineLut;
};

export const AnimationSyncContext = createContext<AnimationSync>({
  sineLut: createSineLut()
});

