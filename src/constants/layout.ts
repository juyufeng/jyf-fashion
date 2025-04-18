export const LAYOUT_MODE = {
  // 左右布局模式
  LEFT_CHAT_RIGHT_DOMAIN: 'left:chat-view---right:domain-view',
  LEFT_DOMAIN_RIGHT_CHAT: 'left:domain-view---right:chat-view',
  
  // 底部业务层顶部悬浮模式
  BASE_DOMAIN_HOVER_CHAT_FULL: 'base:domain-view---hover:chat-view---full',
  BASE_DOMAIN_HOVER_CHAT_LEFT: 'base:domain-view---hover:chat-view---left',
  BASE_DOMAIN_HOVER_CHAT_RIGHT: 'base:domain-view---hover:chat-view---right',
  
  // 底部AI层顶部悬浮模式
  BASE_CHAT_HOVER_DOMAIN: 'base:chat-view---hover:domain-view',
  
  // 单视图模式
  ONLY_CHAT: 'only-visible:chat-view',
  ONLY_DOMAIN: 'only-visible:domain-view'
} as const;

export type LayoutModeType = typeof LAYOUT_MODE[keyof typeof LAYOUT_MODE];