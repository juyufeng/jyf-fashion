
import { LayoutModeType } from '@/constants/layout';

/**
 * 布局配置接口
 * 定义了不同布局模式下的视图显示状态
 */
export interface LayoutConfig {
  // 布局模式名称
  modeName: LayoutModeType;
  // 菜单是否可见
  isMenuVisible: boolean;
  // AI聊天视图是否可见
  visibleChatView: boolean;
  // 业务视图是否可见
  visibleDomainView: boolean;
}