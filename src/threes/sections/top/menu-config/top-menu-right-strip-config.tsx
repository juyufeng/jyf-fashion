import { ReactNode } from 'react';
import { AiOutlineInsertRowLeft, AiOutlineInsertRowRight } from 'react-icons/ai';

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
    key: 'left',
    content: 'Insert Row Left',
    icon: <AiOutlineInsertRowLeft style={IconStyle} />
  },
  {
    key: 'right',
    content: 'Insert Row Right',
    icon: <AiOutlineInsertRowRight style={IconStyle} />
  }
];