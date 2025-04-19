export const sections = {
  // Three布局相关sections
  threeTop: () => import('@/threes/sections/top/top-section'),
  threeBottom: () => import('@/threes/sections/bottom/bottom-section'),
  threeLeft: () => import('@/threes/sections/left/left-section'),
  threeRight: () => import('@/threes/sections/right/right-section'),
  threeCenter: () => import('@/threes/sections/center/center-section'),
} as const;

export type SectionKeys = keyof typeof sections;