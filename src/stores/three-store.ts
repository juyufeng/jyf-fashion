import { observable, action, set } from "mobx";
import threeTopStore from '@/stores/three-stores/three-top-store';
import threeBottomStore from '@/stores/three-stores/three-bottom-store';
import threeLeftStore from '@/stores/three-stores/three-left-store';
import threeRightStore from '@/stores/three-stores/three-right-store';
import threeCenterStore from '@/stores/three-stores/three-center-store';

import rulerStore from '@/stores/three-stores/ruler-store';

const $store = observable({
  threeTopStore,
  threeBottomStore,
  threeLeftStore,
  threeRightStore,
  threeCenterStore,
  rulerStore,
  // 可以在这里添加共享状态或方法
  scale: 1, // 初始缩放比例

  // 更新缩放比例的方法
  setScale(newScale: number) {
    this.scale = newScale;
  },
});

export default $store;
