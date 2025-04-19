import { useState, useEffect } from 'react';
import { THREE_LAYOUT } from '@/configs/three-layout';

export interface Dimensions {
  width: number;
  height: number;
  currentChatWidth: number;
  centerWidth: number;
  centerHeight: number;
}

export const useWindowSize = () => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: window.innerWidth,
    height: window.innerHeight,
    currentChatWidth: 375,
    centerWidth: window.innerWidth - THREE_LAYOUT.LEFT.WIDTH - THREE_LAYOUT.RIGHT.WIDTH,
    centerHeight: window.innerHeight - THREE_LAYOUT.NAV.HEIGHT - THREE_LAYOUT.BOTTOM.HEIGHT
  });

  useEffect(() => {
    const handleResize = (): void => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        currentChatWidth: 375,
        centerWidth: window.innerWidth - THREE_LAYOUT.LEFT.WIDTH - THREE_LAYOUT.RIGHT.WIDTH,
        centerHeight: window.innerHeight - THREE_LAYOUT.NAV.HEIGHT - THREE_LAYOUT.BOTTOM.HEIGHT
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
};