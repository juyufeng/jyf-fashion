export interface MenuItem {
  label: string;
  shortcut: string;
  tips?: string;
}

export const TOP_MENU_ITEMS: MenuItem[] = [
  { label: "文件", shortcut: "F", tips: "打开文件菜单" },
  { label: "编辑", shortcut: "E", tips: "打开编辑菜单" },
  { label: "绘图", shortcut: "D", tips: "打开绘图菜单" },
  { label: "样片处理", shortcut: "P", tips: "打开样片处理菜单" },
  { label: "标注", shortcut: "M", tips: "打开标注菜单" },
  { label: "检查", shortcut: "C", tips: "打开检查菜单" },
  { label: "视区", shortcut: "V", tips: "打开视区菜单" },
  { label: "窗口", shortcut: "W", tips: "打开窗口菜单" },
  { label: "帮助", shortcut: "H", tips: "打开帮助菜单" }
];