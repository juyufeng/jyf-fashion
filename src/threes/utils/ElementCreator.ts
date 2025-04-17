import * as THREE from 'three';
import { v4 as uuidv4 } from 'uuid';
import { Element, GroupElement } from '../types/elements';  // 确保导入 GroupElement

export class ElementCreator {
  private scene: THREE.Scene;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  createLine(startPoint: THREE.Vector2, endPoint: THREE.Vector2): Element {
    const geometry = new THREE.BufferGeometry();
    const points = [
      new THREE.Vector3(startPoint.x, startPoint.y, 0),
      new THREE.Vector3(endPoint.x, endPoint.y, 0)
    ];
    geometry.setFromPoints(points);
    
    const material = new THREE.LineBasicMaterial({ color: 0x000000 });
    const line = new THREE.Line(geometry, material);
    
    this.scene.add(line);
    
    return {
      id: uuidv4(),
      type: 'line',
      object: line,
      isLocked: false,
      isSelected: false,
      start: startPoint,  // 修改为 start 以匹配 LineElement 接口
      end: endPoint      // 修改为 end 以匹配 LineElement 接口
    };
  }

  createRectangle(width: number, height: number, position: THREE.Vector2): Element {
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x000000,
      wireframe: true
    });
    const rectangle = new THREE.Mesh(geometry, material);
    rectangle.position.set(position.x, position.y, 0);
    
    this.scene.add(rectangle);
    
    return {
      id: uuidv4(),
      type: 'rectangle',
      object: rectangle,
      isLocked: false,
      isSelected: false,
      width,
      height,
      position
    };
  }

  createCircle(radius: number, position: THREE.Vector2): Element {
    const geometry = new THREE.CircleGeometry(radius, 32);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x000000,
      wireframe: true
    });
    const circle = new THREE.Mesh(geometry, material);
    circle.position.set(position.x, position.y, 0);
    
    this.scene.add(circle);
    
    return {
      id: uuidv4(),
      type: 'circle',
      object: circle,
      isLocked: false,
      isSelected: false,
      radius,
      position
    };
  }

  createBezier(points: THREE.Vector2[]): Element {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(points[0].x, points[0].y, 0),
      new THREE.Vector3(points[1].x, points[1].y, 0),
      new THREE.Vector3(points[2].x, points[2].y, 0)
    );

    const geometry = new THREE.BufferGeometry();
    const curvePoints = curve.getPoints(50);
    const positions = new Float32Array(curvePoints.length * 3);
    
    curvePoints.forEach((point, i) => {
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;
    });
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.LineBasicMaterial({ color: 0x000000 });
    const bezier = new THREE.Line(geometry, material);
    
    this.scene.add(bezier);
    
    return {
      id: uuidv4(),
      type: 'bezier',
      object: bezier,
      isLocked: false,
      isSelected: false,
      points
    };
  }

  createText(content: string, position: THREE.Vector2, fontSize: number = 20): Element {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 256;
    
    if (context) {
      context.font = `${fontSize}px Arial`;
      context.fillStyle = 'black';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(content, canvas.width/2, canvas.height/2);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    const text = new THREE.Sprite(material);
    text.position.set(position.x, position.y, 0);
    text.scale.set(100, 50, 1);
    
    this.scene.add(text);
    
    return {
      id: uuidv4(),
      type: 'text',
      object: text,
      isLocked: false,
      isSelected: false,
      content,
      position,
      fontSize  // 确保包含 fontSize 属性
    };
  }

  createImage(url: string, position: THREE.Vector2, width: number, height: number): Promise<Element> {
    return new Promise((resolve) => {
      const loader = new THREE.TextureLoader();
      loader.load(url, (texture) => {
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true
        });
        const geometry = new THREE.PlaneGeometry(width, height);
        const image = new THREE.Mesh(geometry, material);
        image.position.set(position.x, position.y, 0);
        
        this.scene.add(image);
        
        resolve({
          id: uuidv4(),
          type: 'image',
          object: image,
          isLocked: false,
          isSelected: false,
          url,
          position,
          width,
          height
        });
      });
    });
  }

  setSelected(element: Element, isSelected: boolean) {
      if (element.type === 'group') {
          element.children.forEach(child => this.setSelected(child, isSelected));
          return;
      }
  
      // 处理所有可能的材质类型
      if (element.object instanceof THREE.Mesh || 
          element.object instanceof THREE.Line ||
          element.object instanceof THREE.Sprite) {
          
          const material = element.object.material;
          if (material instanceof THREE.MeshBasicMaterial || 
              material instanceof THREE.LineBasicMaterial ||
              material instanceof THREE.SpriteMaterial) {
              material.color.setHex(isSelected ? 0xff0000 : 0x000000);
          }
      }
  }

  createGroup(elements: Element[]): GroupElement {
    const group = new THREE.Group();
    elements.forEach(element => group.add(element.object));

    const groupElement: GroupElement = {
      id: Math.random().toString(36).slice(2, 11), // 使用 slice 替代 substr
      type: 'group',
      object: group,
      isLocked: false,
      isSelected: false,
      children: elements
    };

    this.scene.add(group);
    return groupElement;
  }

  // 添加 removeElement 方法
  removeElement(element: Element): void {
    if (element.type === 'group') {
      element.children.forEach(child => {
        this.scene.remove(child.object);
      });
    }
    this.scene.remove(element.object);
  }

  ungroup(groupElement: GroupElement): Element[] {
    groupElement.children.forEach(child => {
      this.scene.add(child.object);
      groupElement.object.remove(child.object);
    });
    
    this.scene.remove(groupElement.object);
    return groupElement.children;
  }
}