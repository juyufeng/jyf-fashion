import type { Dimensions } from '@/hooks/use-window-size';
import LayoutStore from "@/stores/layout-store";
import { LAYOUT_MODE } from '@/constants/layout';
import { THREE_LAYOUT } from '@/configs/three-layout';

// AI聊天视图固定宽度
const FIXED_V_WIDTH = 375;

/**
 * 计算AI聊天视图宽度
 */
export const aiChatWidth = (dimensions: Dimensions) => {
  const layoutConfig = LayoutStore.fetchLayoutMode(LayoutStore.currentLayoutMode);

  switch (layoutConfig.modeName) {
    // 左侧聊天, 右侧业务
    case LAYOUT_MODE.LEFT_CHAT_RIGHT_DOMAIN:
      return FIXED_V_WIDTH;
    // 左侧业务, 右侧聊天
    case LAYOUT_MODE.LEFT_DOMAIN_RIGHT_CHAT:
      return dimensions.width - FIXED_V_WIDTH;
    // 底部Ai聊天层-业务层悬浮全屏覆盖
    case LAYOUT_MODE.BASE_DOMAIN_HOVER_CHAT_FULL:
      return dimensions.width;
    // 底部Ai聊天层-业务层悬浮全屏覆盖
    case LAYOUT_MODE.BASE_CHAT_HOVER_DOMAIN:
      return dimensions.width;
    // 只有Ai聊天层
    case LAYOUT_MODE.ONLY_CHAT:
      return dimensions.width;
    // 只有业务层
    case LAYOUT_MODE.ONLY_DOMAIN:
      return 0;
    // 底部业务层-Ai聊天左侧悬浮模式
    case LAYOUT_MODE.BASE_DOMAIN_HOVER_CHAT_LEFT:
      return FIXED_V_WIDTH;
    // 底部业务层-Ai聊天右侧悬浮模式
    case LAYOUT_MODE.BASE_DOMAIN_HOVER_CHAT_RIGHT:
      return FIXED_V_WIDTH;
    // 未知模式
    default:
      return 0;
  }
};

export const domainWidth = (dimensions: Dimensions) => {
  const layoutConfig = LayoutStore.fetchLayoutMode(LayoutStore.currentLayoutMode);

  switch (layoutConfig.modeName) {
    // 左侧聊天, 右侧业务
    case LAYOUT_MODE.LEFT_CHAT_RIGHT_DOMAIN:
      return dimensions.width - FIXED_V_WIDTH;
    // 左侧业务, 右侧聊天
    case LAYOUT_MODE.LEFT_DOMAIN_RIGHT_CHAT:
      return FIXED_V_WIDTH;
    // 底部业务层-Ai聊天全屏覆盖
    case LAYOUT_MODE.BASE_DOMAIN_HOVER_CHAT_FULL:
      return dimensions.width;
    // 底部Ai聊天层-业务层悬浮全屏覆盖
    case LAYOUT_MODE.BASE_CHAT_HOVER_DOMAIN:
      return dimensions.width;
    // 只有Ai聊天层
    case LAYOUT_MODE.ONLY_CHAT:
      return 0;
    // 只有业务层
    case LAYOUT_MODE.ONLY_DOMAIN:
      return dimensions.width;
    // 底部业务层-Ai聊天左侧悬浮模式
    case LAYOUT_MODE.BASE_DOMAIN_HOVER_CHAT_LEFT:
      return dimensions.width;
    // 底部业务层-Ai聊天右侧悬浮模式
    case LAYOUT_MODE.BASE_DOMAIN_HOVER_CHAT_RIGHT:
      return dimensions.width;
    // 未知模式
    default:
      return 0;
  }
};

export const domainHeight = (dimensions: Dimensions) => {
  return dimensions.height;
};

export const domainLeft = (dimensions: Dimensions) => {
  const layoutConfig = LayoutStore.fetchLayoutMode(LayoutStore.currentLayoutMode);

  switch (layoutConfig.modeName) {
    // 左侧聊天, 右侧业务
    case LAYOUT_MODE.LEFT_CHAT_RIGHT_DOMAIN:
      return FIXED_V_WIDTH;
    // 左侧业务, 右侧聊天
    case LAYOUT_MODE.LEFT_DOMAIN_RIGHT_CHAT:
      return 0;
    // 底部业务层-Ai聊天全屏覆盖
    case LAYOUT_MODE.BASE_DOMAIN_HOVER_CHAT_FULL:
      return 0;
    // 底部Ai聊天层-业务层悬浮全屏覆盖
    case LAYOUT_MODE.BASE_CHAT_HOVER_DOMAIN:
      return 0;
    // 只有Ai聊天层
    case LAYOUT_MODE.ONLY_CHAT:
      return 0;
    // 只有业务层
    case LAYOUT_MODE.ONLY_DOMAIN:
      return 0;
    // 底部业务层-Ai聊天左侧悬浮模式
    case LAYOUT_MODE.BASE_DOMAIN_HOVER_CHAT_LEFT:
      return 0;
    // 底部业务层-Ai聊天右侧悬浮模式
    case LAYOUT_MODE.BASE_DOMAIN_HOVER_CHAT_RIGHT:
      return 0;
    // 未知模式
    default:
      return 0;
  }
};

export const domainCenterWidth = (dimensions: Dimensions) => {
  return domainWidth(dimensions) - THREE_LAYOUT.LEFT.WIDTH - THREE_LAYOUT.RIGHT.WIDTH;
}

export const domainCenterHeight = (dimensions: Dimensions) => {
  return domainHeight(dimensions) - THREE_LAYOUT.NAV.HEIGHT - THREE_LAYOUT.BOTTOM.HEIGHT;
}