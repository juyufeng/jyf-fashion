export interface ToolItem {
  name: string;
  icon: string;
  tips?: string;
}

export interface ToolGroup {
  groupName: string;
  tools: ToolItem[];
}

export const TOOL_GROUPS: ToolGroup[] = [
  {
    groupName: "基本图形",
    tools: [
      { name: "点", icon: "https://woda-app-public.oss-cn-shanghai.aliyuncs.com/wodedagong/resource/20250419/e929230b-ecbb-45dc-95c8-419e587af77e.svg", tips: "创建点元素" },
      { name: "钢笔", icon: "https://woda-app-public.oss-cn-shanghai.aliyuncs.com/wodedagong/resource/20250419/b1e0019e-3ff0-4b9f-8be4-0b455f3ad857.svg", tips: "自由绘制路径" },
      { name: "圆", icon: "https://woda-app-public.oss-cn-shanghai.aliyuncs.com/wodedagong/resource/20250419/0bbe4729-07ba-4e94-99f3-a46ebbaa63cf.svg", tips: "绘制圆形" },
      { name: "矩形", icon: "https://woda-app-public.oss-cn-shanghai.aliyuncs.com/wodedagong/resource/20250419/d2d28144-5d73-4ded-82cb-976b071c20c3.svg", tips: "绘制矩形" },
      { name: "平行", icon: "https://woda-app-public.oss-cn-shanghai.aliyuncs.com/wodedagong/resource/20250419/1213becc-68b4-4878-90b0-e5e1d5ee3909.svg", tips: "绘制平行线" },
      { name: "分叉", icon: "https://woda-app-public.oss-cn-shanghai.aliyuncs.com/wodedagong/resource/20250419/36269168-a407-4c08-b5f4-71396d194836.svg", tips: "创建分叉连接" }
    ]
  },
  {
    groupName: "修改工具",
    tools: [
      { name: "点", icon: "https://woda-app-public.oss-cn-shanghai.aliyuncs.com/wodedagong/resource/20250419/e929230b-ecbb-45dc-95c8-419e587af77e.svg", tips: "编辑锚点" },
      { name: "钢笔", icon: "https://woda-app-public.oss-cn-shanghai.aliyuncs.com/wodedagong/resource/20250419/b1e0019e-3ff0-4b9f-8be4-0b455f3ad857.svg", tips: "路径修改工具" },
      { name: "圆", icon: "https://woda-app-public.oss-cn-shanghai.aliyuncs.com/wodedagong/resource/20250419/0bbe4729-07ba-4e94-99f3-a46ebbaa63cf.svg", tips: "调整圆半径" },
      { name: "矩形", icon: "https://woda-app-public.oss-cn-shanghai.aliyuncs.com/wodedagong/resource/20250419/d2d28144-5d73-4ded-82cb-976b071c20c3.svg", tips: "修改矩形尺寸" },
      { name: "平行", icon: "https://woda-app-public.oss-cn-shanghai.aliyuncs.com/wodedagong/resource/20250419/1213becc-68b4-4878-90b0-e5e1d5ee3909.svg", tips: "调整平行间距" },
      { name: "分叉", icon: "https://woda-app-public.oss-cn-shanghai.aliyuncs.com/wodedagong/resource/20250419/36269168-a407-4c08-b5f4-71396d194836.svg", tips: "调整分叉角度" }
    ]
  },
  // 重复其他4个组的配置，根据实际需求修改groupName和tips
  // 此处省略第三到第六组配置，结构同上...
];