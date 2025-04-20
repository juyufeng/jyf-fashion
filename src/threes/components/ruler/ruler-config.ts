// 标尺配置对象，定义了标尺的外观和行为
export const rulerConfig = {
  lineColor: 'blue', // 标尺线的颜色
  textColor: 'rgb(88, 88 , 88)', // 标尺文字的颜色
  lineWidth: 1, // 标尺线的宽度
  fontSize: 8, // 标尺文字的字体大小
  textPaddingX: 0, // X轴标尺文字与标尺线之间的间距
  textPaddingY: 0, // Y轴标尺文字与标尺线之间的间距
  textOffsetX: 2, // X轴标尺文字的偏移量
  textOffsetY: 10, // Y轴标尺文字的偏移量
  textInterval: 10, // 标尺文字的显示间隔
  textDecimalPlaces: 1, // 标尺文字保留的小数位数
  textUnit: ' dd', // 标尺文字的单位
  textFont: 'Arial', // 标尺文字的字体
  textBold: false, // 标尺文字是否加粗
  textItalic: false, // 标尺文字是否斜体
  textShadow: false, // 标尺文字是否有阴影
  textShadowColor: 'black', // 标尺文字阴影的颜色
  textShadowBlur: 2, // 标尺文字阴影的模糊度
  textShadowOffsetX: 1, // 标尺文字阴影的水平偏移量
  textShadowOffsetY: 1, // 标尺文字阴影的垂直偏移量
  tickSpacing: 60, // 标尺刻度之间的间隔
  tickLength: 10, // 标尺刻度线的长度
  backgroundColor: 'rgba(240, 240, 140, 0.65)', // 新增：标尺背景颜色
};