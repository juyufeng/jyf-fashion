import { observable } from "mobx";
import threeTopStore from './three-stores/three-top-store';
import threeBottomStore from './three-stores/three-bottom-store';
import threeLeftStore from './three-stores/three-left-store';
import threeRightStore from './three-stores/three-right-store';

const $store = observable({
  threeTopStore,
  threeBottomStore,
  threeLeftStore,
  threeRightStore,
  // 可以在这里添加共享状态或方法
});

export default $store;
