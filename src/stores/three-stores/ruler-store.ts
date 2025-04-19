import { observable } from "mobx";

interface Guide {
  x: number;
  y: number;
  orientation: 'horizontal' | 'vertical';
}

const $store = observable({
  origin: { x: 0, y: 0 },
  guides: [] as Guide[],

  setOrigin(x: number, y: number) {
    this.origin = { x, y };
  },

  resetOrigin() {
    this.origin = { x: 0, y: 0 };
  },

  addGuide(guide: Guide) {
    this.guides.push(guide);
  },

  removeGuide(index: number) {
    this.guides.splice(index, 1);
  }
});

export default $store;