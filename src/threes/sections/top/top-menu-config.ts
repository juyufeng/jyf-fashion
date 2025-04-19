export interface DropdownItem {
  label: string;
  tips: string;
}

export interface MenuItem {
  label: string;
  shortcut: string;
  tips?: string;
  dropdownItems?: DropdownItem[]; // 使用结构化的下拉列表项
}

export const TOP_MENU_ITEMS: MenuItem[] = [
  { 
    label: "文件", 
    shortcut: "F", 
    tips: "打开文件菜单", 
    dropdownItems: [
      { label: "新建", tips: "Command + N" },
      { label: "打开", tips: "Command + O" },
      { label: "保存", tips: "Command + S" },
      { label: "另存为", tips: "Command + Shift + S" }
    ] 
  },
  { 
    label: "编辑", 
    shortcut: "E", 
    tips: "打开编辑菜单", 
    dropdownItems: [
      { label: "撤销", tips: "Command + Z" },
      { label: "重做", tips: "Command + Shift + Z" },
      { label: "剪切", tips: "Command + X" },
      { label: "复制", tips: "Command + C" },
      { label: "粘贴", tips: "Command + V" }
    ] 
  },
  { 
    label: "绘图", 
    shortcut: "D", 
    tips: "打开绘图菜单", 
    dropdownItems: [
      { label: "直线", tips: "L" },
      { label: "矩形", tips: "R" },
      { label: "圆形", tips: "C" },
      { label: "多边形", tips: "P" }
    ] 
  },
  { 
    label: "样片处理", 
    shortcut: "P", 
    tips: "打开样片处理菜单", 
    dropdownItems: [
      { label: "调整大小", tips: "Command + R" },
      { label: "裁剪", tips: "Command + C" },
      { label: "旋转", tips: "Command + T" }
    ] 
  },
  { 
    label: "标注", 
    shortcut: "M", 
    tips: "打开标注菜单", 
    dropdownItems: [
      { label: "添加文字", tips: "T" },
      { label: "箭头", tips: "A" },
      { label: "高亮", tips: "H" }
    ] 
  },
  { 
    label: "检查", 
    shortcut: "C", 
    tips: "打开检查菜单", 
    dropdownItems: [
      { label: "拼写检查", tips: "F7" },
      { label: "语法检查", tips: "F8" }
    ] 
  },
  { 
    label: "视区", 
    shortcut: "V", 
    tips: "打开视区菜单", 
    dropdownItems: [
      { label: "缩放", tips: "Command + +" },
      { label: "全屏", tips: "F11" },
      { label: "退出全屏", tips: "Esc" }
    ] 
  },
  { 
    label: "窗口", 
    shortcut: "W", 
    tips: "打开窗口菜单", 
    dropdownItems: [
      { label: "最小化", tips: "Command + M" },
      { label: "最大化", tips: "Command + Control + F" },
      { label: "关闭", tips: "Command + W" }
    ] 
  },
  { 
    label: "帮助", 
    shortcut: "H", 
    tips: "打开帮助菜单", 
    dropdownItems: [
      { label: "查看帮助", tips: "F1" },
      { label: "关于", tips: "Command + I" }
    ] 
  }
];