import { useEffect, useRef, useState } from "react";

export function useTypingEffect(
  textToType: string,
  interKeyStrokeDurationInMs: number
): string {
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const currentPositionRef = useRef<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("interval");
      setCurrentPosition((value) => value + 1);
      currentPositionRef.current += 1;
      if (currentPositionRef.current > textToType.length) {
        clearInterval(intervalId);
      }
    }, interKeyStrokeDurationInMs);
    return () => {
      clearInterval(intervalId);
      currentPositionRef.current = 0;
      setCurrentPosition(0);
    };
  }, [interKeyStrokeDurationInMs, textToType]);

  return textToType.substring(0, currentPosition);
}
