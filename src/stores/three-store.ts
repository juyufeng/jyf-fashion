import { observable } from "mobx";
import threeTopStore from '@/stores/three-stores/three-top-store';
import threeBottomStore from '@/stores/three-stores/three-bottom-store';
import threeLeftStore from '@/stores/three-stores/three-left-store';
import threeRightStore from '@/stores/three-stores/three-right-store';
import threeCenterStore from '@/stores/three-stores/three-center-store';

const $store = observable({
  threeTopStore,
  threeBottomStore,
  threeLeftStore,
  threeRightStore,
  threeCenterStore,
  // 可以在这里添加共享状态或方法
});

export default $store;
