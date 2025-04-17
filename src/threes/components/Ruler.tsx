import React from 'react';
import * as THREE from 'three';

interface RulerProps {
  scene: THREE.Scene;
  width: number;
  height: number;
}

const Ruler: React.FC<RulerProps> = ({ scene, width, height }) => {
  React.useEffect(() => {
    // 创建水平标尺
    const horizontalGeometry = new THREE.BufferGeometry();
    const verticalGeometry = new THREE.BufferGeometry();
    
    // 生成刻度点
    const hPoints = [];
    const vPoints = [];
    const step = 50; // 每个刻度的间距
    
    // 使用 Canvas 渲染文字
    const createTextSprite = (text: string, x: number, y: number) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return null;
      
      canvas.width = 64;
      canvas.height = 32;
      
      context.font = '12px Arial';
      context.fillStyle = 'black';
      context.textAlign = 'center';
      context.fillText(text, canvas.width/2, canvas.height/2);
      
      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(30, 15, 1);
      sprite.position.set(x, y, 0);
      
      return sprite;
    };
    
    // 水平标尺点
    for (let i = -width/2; i <= width/2; i += step) {
      // 主刻度线
      hPoints.push(i, 0, 0);
      hPoints.push(i, 20, 0);
      
      // 添加刻度数字
      const textSprite = createTextSprite(String(i), i, 25);
      if (textSprite) {
        scene.add(textSprite);
      }
    }
    
    // 垂直标尺点
    for (let i = -height/2; i <= height/2; i += step) {
      vPoints.push(0, i, 0);
      vPoints.push(20, i, 0);
      
      // 添加刻度数字
      const textSprite = createTextSprite(String(i), 25, i);
      if (textSprite) {
        scene.add(textSprite);
      }
    }
    
    horizontalGeometry.setAttribute('position', new THREE.Float32BufferAttribute(hPoints, 3));
    verticalGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vPoints, 3));
    
    const material = new THREE.LineBasicMaterial({ color: 0x000000 });
    
    const horizontalRuler = new THREE.LineSegments(horizontalGeometry, material);
    const verticalRuler = new THREE.LineSegments(verticalGeometry, material);
    
    scene.add(horizontalRuler);
    scene.add(verticalRuler);
    
    return () => {
      scene.remove(horizontalRuler);
      scene.remove(verticalRuler);
      horizontalGeometry.dispose();
      verticalGeometry.dispose();
      material.dispose();
    };
  }, [scene, width, height]);

  return null;
};

export default Ruler;