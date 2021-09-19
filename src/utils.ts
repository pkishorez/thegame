import { useEffect, useState } from "react";

export const diff = <A, B>(oldArr: A[], newArr: B[]) => {
  const oldSet = new Set(oldArr.map((v: any) => v.id));
  const newSet = new Set(newArr.map((v: any) => v.id));
  const removed = oldArr.filter((v: any) => !newSet.has(v.id));
  const added = newArr.filter((v: any) => !oldSet.has(v.id));

  return {
    added,
    removed,
  };
};

export const useRequestAnimationFrame = () => {
  const [tick, setTick] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setTick(!tick);
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  });

  return tick;
};
