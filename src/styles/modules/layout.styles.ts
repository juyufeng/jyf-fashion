import { THEME } from '@/configs/theme';
import type { Dimensions } from '@/hooks/use-window-size';
import  { aiChatWidth, domainWidth, domainLeft } from '@/styles/filters/layout-func';

export const useContainerStyles = (dimensions: Dimensions) => ({
  aiStyle: {
    width: `${aiChatWidth(dimensions)}px`,
    height: `${dimensions.height}px`,
    position: 'relative',
    background: THEME.COLORS.BACKGROUND.DEFAULT,
  },
  threeStyle: {
    width: `${domainWidth(dimensions)}px`,
    height: `${dimensions.height}px`,
    position:'absolute',
    top: 0,
    left: `${domainLeft(dimensions)}px`,
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