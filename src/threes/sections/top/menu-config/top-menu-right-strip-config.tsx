import { ReactNode } from 'react';
import { AiOutlineInsertRowLeft, AiOutlineInsertRowRight, AiOutlineTable } from 'react-icons/ai';
import { MenuRightStripType } from '@/enums/menu-right-strip-enums';

export interface IconConfig {
  key: string;
  content: string;
  icon: ReactNode;
}

const IconStyle = {
  width: '20px',
  height: '20px',
  cursor: 'pointer',
} as const;

export const ICON_CONFIGS: IconConfig[] = [
  {
    key: MenuRightStripType.OnlyDomainView,
    content: '仅仅展示工作区',
    icon: <AiOutlineTable style={IconStyle} />
  },
  {
    key: MenuRightStripType.ChatAiInsertLeftView,
    content: '左侧展示Ai聊天区, 右侧展示工作区',
    icon: <AiOutlineInsertRowLeft style={IconStyle} />
  },
  {
    key: MenuRightStripType.ChatAiInsertRightView,
    content: '左侧展示工作区, 右侧展示Ai聊天区',
    icon: <AiOutlineInsertRowRight style={IconStyle} />
  }
];