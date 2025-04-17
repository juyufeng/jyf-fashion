import React from 'react';
import { 
  LineIcon, 
  BezierIcon, 
  RectangleIcon, 
  CircleIcon, 
  TextIcon, 
  ImageIcon 
} from './Icons';  // 稍后我们会创建这个图标组件

interface ToolBarProps {
  onSelectTool: (tool: string) => void;
  selectedTool: string | null;
}

const tools = [
  { id: 'line', name: '直线', icon: LineIcon },
  { id: 'bezier', name: '贝塞尔曲线', icon: BezierIcon },
  { id: 'rectangle', name: '矩形', icon: RectangleIcon },
  { id: 'circle', name: '圆形', icon: CircleIcon },
  { id: 'text', name: '文字', icon: TextIcon },
  { id: 'image', name: '图片', icon: ImageIcon },
];

const ToolBar: React.FC<ToolBarProps> = ({ onSelectTool, selectedTool }) => {
  return (
    <div style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: '60px',
      height: '100%',
      backgroundColor: '#fff',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      padding: '10px'
    }}>
      {tools.map(tool => (
        <div
          key={tool.id}
          onClick={() => onSelectTool(tool.id)}
          style={{
            padding: '10px',
            margin: '5px 0',
            cursor: 'pointer',
            backgroundColor: selectedTool === tool.id ? '#e6e6e6' : 'transparent',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <tool.icon />
          <span style={{ fontSize: '12px' }}>{tool.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ToolBar;