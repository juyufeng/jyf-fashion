import { useState, useEffect } from 'react';

export interface Dimensions {
  width: number;
  height: number;
  currentChatWidth: number;
}

export const useWindowSize = () => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: window.innerWidth,
    height: window.innerHeight,
    currentChatWidth: 375,
  });

  useEffect(() => {
    const handleResize = (): void => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        currentChatWidth: 375,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
};