export interface MenuItem {
  label: string;
  shortcut: string;
  tips?: string;
  dropdownItems?: string[]; // 新增下拉列表项
}

export const TOP_MENU_ITEMS: MenuItem[] = [
  { label: "文件", shortcut: "F", tips: "打开文件菜单", dropdownItems: ["新建", "打开", "保存", "另存为"] },
  { label: "编辑", shortcut: "E", tips: "打开编辑菜单", dropdownItems: ["撤销", "重做", "剪切", "复制", "粘贴"] },
  { label: "绘图", shortcut: "D", tips: "打开绘图菜单", dropdownItems: ["直线", "矩形", "圆形", "多边形"] },
  { label: "样片处理", shortcut: "P", tips: "打开样片处理菜单", dropdownItems: ["调整大小", "裁剪", "旋转"] },
  { label: "标注", shortcut: "M", tips: "打开标注菜单", dropdownItems: ["添加文字", "箭头", "高亮"] },
  { label: "检查", shortcut: "C", tips: "打开检查菜单", dropdownItems: ["拼写检查", "语法检查"] },
  { label: "视区", shortcut: "V", tips: "打开视区菜单", dropdownItems: ["缩放", "全屏", "退出全屏"] },
  { label: "窗口", shortcut: "W", tips: "打开窗口菜单", dropdownItems: ["最小化", "最大化", "关闭"] },
  { label: "帮助", shortcut: "H", tips: "打开帮助菜单", dropdownItems: ["查看帮助", "关于"] }
];