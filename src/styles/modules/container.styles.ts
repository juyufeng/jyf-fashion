import { THEME } from '@/configs/theme';
import type { Dimensions } from '@/hooks/use-window-size';
import { b } from 'vitest/dist/chunks/suite.d.FvehnV49';

export const useContainerStyles = (dimensions: Dimensions) => ({
  aiStyle: {
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
    position: 'relative',
    background: THEME.COLORS.BACKGROUND.DEFAULT,
  },
  threeStyle: {
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
    position:'absolute',
    top: 0,
    left: 0,
    background: 'white',
  },
  getMinAppWidth: () => {
    if (dimensions.width < THEME.SIZES.BREAKPOINT) {
      return THEME.SIZES.MIN_WIDTH.MOBILE;
    }
    return THEME.SIZES.MIN_WIDTH.DESKTOP;
  },
  getAppNavHeight: () => THEME.LAYOUT.NAV.HEIGHT,
});