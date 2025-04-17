import * as THREE from 'three';

export interface BaseElement {
  id: string;
  type: string;
  object: THREE.Object3D;
  isLocked: boolean;
  isSelected: boolean;
}

export interface LineElement extends BaseElement {
  type: 'line';
  start: THREE.Vector2;
  end: THREE.Vector2;
}

export interface BezierElement extends BaseElement {
  type: 'bezier';
  points: THREE.Vector2[];
}

export interface RectangleElement extends BaseElement {
  type: 'rectangle';
  width: number;
  height: number;
  position: THREE.Vector2;
}

export interface CircleElement extends BaseElement {
  type: 'circle';
  radius: number;
  position: THREE.Vector2;
}

export interface TextElement extends BaseElement {
  type: 'text';
  content: string;
  position: THREE.Vector2;
  fontSize: number;  // 添加 fontSize 属性
}

export interface GroupElement extends BaseElement {
  type: 'group';
  children: Element[];
}

export interface ImageElement extends BaseElement {
  type: 'image';
  url: string;
  position: THREE.Vector2;
  width: number;
  height: number;
}

export type Element = 
  | LineElement 
  | BezierElement 
  | RectangleElement 
  | CircleElement 
  | TextElement 
  | ImageElement  // 现在 ImageElement 已正确定义
  | GroupElement;  // 添加 GroupElement 到联合类型