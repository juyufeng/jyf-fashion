import { observable } from "mobx";
import { LAYOUT_MODE, LayoutModeType } from '@/constants/layout';
import { LayoutConfig } from '@/types/layout';

const $store = observable({
  /**
   * 布局模式配置管理
   * ----------------------------------------
   * 系统分为两个主要层级：
   * 1. AI 辅助层 (chat-view)
   *    - 处理AI对话交互
   *    - 管理聊天界面布局
   *
   * 2. 业务层 (domain-view)
   *    - 处理核心业务逻辑
   *    - 展示业务相关内容
   * ----------------------------------------
   * @param modeName 布局模式名称
   * @returns {Object} 布局配置信息
   */
  fetchLayoutMode(modeName: LayoutModeType): LayoutConfig {
    switch (modeName) {
      // 1.左侧聊天, 右侧业务层
      case LAYOUT_MODE.LEFT_CHAT_RIGHT_DOMAIN:
        return {
          modeName: LAYOUT_MODE.LEFT_CHAT_RIGHT_DOMAIN,
          isMenuVisible: false,
          visibleChatView: true,
          visibleDomainView: true,
        };
      // 2.左侧业务层, 右侧聊天层
      case LAYOUT_MODE.LEFT_DOMAIN_RIGHT_CHAT:
        return {
          modeName: LAYOUT_MODE.LEFT_DOMAIN_RIGHT_CHAT,
          isMenuVisible: false,
          visibleChatView: true,
          visibleDomainView: true,
        };
      // 3.底部业务层, 顶部Ai聊天层悬浮模式, 全屏悬浮
      case LAYOUT_MODE.BASE_DOMAIN_HOVER_CHAT_FULL:
        return {
          modeName: LAYOUT_MODE.BASE_DOMAIN_HOVER_CHAT_FULL,
          isMenuVisible: true,
          visibleChatView: true,
          visibleDomainView: true,
        };
      // 4.底部AI层, 顶部Ai聊天层悬浮模式, 左侧悬浮  
      case LAYOUT_MODE.BASE_DOMAIN_HOVER_CHAT_LEFT:
        return {
          modeName: LAYOUT_MODE.BASE_DOMAIN_HOVER_CHAT_LEFT,
          isMenuVisible: false,
          visibleChatView: true,
          visibleDomainView: true,
        };
      // 5.底部AI层, 顶部Ai聊天层悬浮模式, 右侧悬浮
      case LAYOUT_MODE.BASE_DOMAIN_HOVER_CHAT_RIGHT:
        return {
          modeName: LAYOUT_MODE.BASE_DOMAIN_HOVER_CHAT_RIGHT,
          isMenuVisible: false,
          visibleChatView: true,
          visibleDomainView: true,
        };
      // 6.底部AI层顶部悬浮模式  
      case LAYOUT_MODE.BASE_CHAT_HOVER_DOMAIN:
        return {
          modeName: LAYOUT_MODE.BASE_CHAT_HOVER_DOMAIN,
          isMenuVisible: true,
          visibleChatView: true,
          visibleDomainView: true,
        };
      // 7.单视图模式-只显示聊天视图 
      case LAYOUT_MODE.ONLY_CHAT:
        return {
          modeName: LAYOUT_MODE.ONLY_CHAT,
          isMenuVisible: true,
          visibleChatView: true,
          visibleDomainView: false,
        };
      // 8.单视图模式-只显示业务视图  
      case LAYOUT_MODE.ONLY_DOMAIN:
        return {
          modeName: LAYOUT_MODE.ONLY_DOMAIN,
          isMenuVisible: true,
          visibleChatView: false,
          visibleDomainView: true,
        };
    }
  },
  // 当前布局模式
  currentLayoutMode: LAYOUT_MODE.LEFT_CHAT_RIGHT_DOMAIN as LayoutModeType,

  setCurrentLayoutMode(modeName: LayoutModeType) {
    this.currentLayoutMode = modeName;
  },
  

});

export default $store;
