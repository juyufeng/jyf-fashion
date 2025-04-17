import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Ruler from './components/Ruler';
import ToolBar from './components/ToolBar';
import { ElementCreator } from './utils/ElementCreator';
import { Element } from './types/elements';
import ContextMenu from './components/ContextMenu';
import { v4 as uuidv4 } from 'uuid';

const ThreeHome: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scene] = useState(new THREE.Scene());
  const [camera] = useState(new THREE.OrthographicCamera(
    window.innerWidth / -2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    window.innerHeight / -2,
    1,
    1000
  ));
  
  useEffect(() => {
    if (!containerRef.current) return;

    // 渲染器设置
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xf0f0f0);
    containerRef.current.appendChild(renderer.domElement);

    // 相机位置
    camera.position.set(0, 0, 500);
    camera.lookAt(0, 0, 0);

    // 控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableRotate = false;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.screenSpacePanning = true; // 添加这行，确保平移是在屏幕空间进行的

    // 创建网格辅助线
    // 修改网格辅助线为无限长度
    const gridSize = 10000; // 足够大的值模拟无限
    const gridDivisions = 100;
    const gridHelper = new THREE.GridHelper(gridSize, gridDivisions);
    gridHelper.rotation.x = Math.PI / 2;
    
    // 添加无限坐标轴
    const axesSize = gridSize * 2;
    const axesHelper = new THREE.AxesHelper(axesSize);
    // 修改网格材质
    const gridMaterial = new THREE.LineBasicMaterial({
      color: 0x000000,
      opacity: 0.2,
      transparent: true
    });
    gridHelper.material = gridMaterial;
    scene.add(gridHelper);

    
    scene.add(axesHelper);

    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // 窗口大小调整处理
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.left = width / -2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = height / -2;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [scene, camera]);

  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  
  const handleToolSelect = (tool: string) => {
    setSelectedTool(tool);
  };
  
  const [elements, setElements] = useState<Element[]>([]);
  const [elementCreator, setElementCreator] = useState<ElementCreator | null>(null);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingPoints, setDrawingPoints] = useState<THREE.Vector2[]>([]);
  const [selectedElements, setSelectedElements] = useState<Element[]>([]);

// 在ThreeHome组件中添加
const [isDragging, setIsDragging] = useState(false);
const [dragStartPos, setDragStartPos] = useState<THREE.Vector2 | null>(null);

// 添加 getCanvasPoint 函数
const getCanvasPoint = (event: React.MouseEvent): THREE.Vector2 => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return new THREE.Vector2();
    
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    return new THREE.Vector2(x, y);
};

// 修改鼠标事件处理函数
const handleMouseDown = (event: React.MouseEvent) => {
    if (selectedElement && !selectedElement.isLocked) {
        setIsDragging(true);
        const point = getCanvasPoint(event);
        setDragStartPos(point);
    }
};

const handleMouseMove = (event: React.MouseEvent) => {
    if (isDragging && selectedElement && dragStartPos) {
        const currentPos = getCanvasPoint(event);
        const delta = new THREE.Vector2().subVectors(currentPos, dragStartPos);
        
        // 更新元素位置
        selectedElement.object.position.x += delta.x;
        selectedElement.object.position.y += delta.y;
        setDragStartPos(currentPos);
    }
};

const handleMouseUp = () => {
    setIsDragging(false);
};

// 添加 handleContextMenu 函数
const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (selectedElement) {
        setContextMenu({ 
            x: event.clientX, 
            y: event.clientY 
        });
    }
};

// 添加 handleElementOperation 对象
const handleElementOperation = {
    delete: () => {
        if (selectedElement && elementCreator) {
            elementCreator.removeElement(selectedElement);
            setElements(elements.filter(el => el.id !== selectedElement.id));
            setSelectedElement(null);
            setContextMenu(null);
        }
    },
    copy: () => {
        if (selectedElement && elementCreator) {
            // 实现复制功能
            const newElement = {...selectedElement, id: uuidv4()};
            setElements([...elements, newElement]);
            setContextMenu(null);
        }
    },
    lock: () => {
        if (selectedElement) {
            setElements(elements.map(el => 
                el.id === selectedElement.id 
                    ? { ...el, isLocked: !el.isLocked }
                    : el
            ));
            setContextMenu(null);
        }
    },
    group: () => {
        if (selectedElements.length > 1 && elementCreator) {
            const groupElement = elementCreator.createGroup(selectedElements);
            setElements(prev => [...prev.filter(el => !selectedElements.includes(el)), groupElement]);
            setSelectedElements([]);
            setContextMenu(null);
        }
    },
    ungroup: () => {
        if (selectedElement?.type === 'group' && elementCreator) {
            const childElements = elementCreator.ungroup(selectedElement);
            setElements(prev => [...prev.filter(el => el.id !== selectedElement.id), ...childElements]);
            setSelectedElement(null);
            setContextMenu(null);
        }
    }
};

// 添加 handleCanvasClick 函数
const handleCanvasClick = (event: React.MouseEvent<HTMLDivElement>) => {
  if (!elementCreator || !selectedTool) return;

  const rect = containerRef.current?.getBoundingClientRect();
  if (!rect) return;

  const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  const point = new THREE.Vector2(x, y);

  switch (selectedTool) {
      case 'line':
          if (!isDrawing) {
              setDrawingPoints([point]);
              setIsDrawing(true);
          } else {
              const newElement = elementCreator.createLine(drawingPoints[0], point);
              setElements([...elements, newElement]);
              setIsDrawing(false);
              setDrawingPoints([]);
          }
          break;
      case 'rectangle':
          const newRect = elementCreator.createRectangle(100, 100, point);
          setElements([...elements, newRect]);
          break;
      case 'circle':
          const newCircle = elementCreator.createCircle(50, point);
          setElements([...elements, newCircle]);
          break;
      case 'text':
          const content = prompt('请输入文字：');
          if (content) {
              const newText = elementCreator.createText(content, point);
              setElements([...elements, newText]);
          }
          break;
  }
};

// 在返回的 JSX 中绑定事件
return (
    <div 
        ref={containerRef} 
        style={{ width: '100%', height: '100%' }}
        onClick={handleCanvasClick}
        onContextMenu={handleContextMenu}  // 使用定义好的处理函数
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
    >
      <Ruler 
        scene={scene}
        width={window.innerWidth}
        height={window.innerHeight}
      />
      {contextMenu && (
        <ContextMenu
          position={{ x: contextMenu.x, y: contextMenu.y }}
          onClose={() => setContextMenu(null)}
          onDelete={handleElementOperation.delete}
          onCopy={handleElementOperation.copy}
          onLock={handleElementOperation.lock}
          onGroup={handleElementOperation.group}
          onUngroup={handleElementOperation.ungroup}
          isLocked={selectedElement?.isLocked || false}
          isGroup={selectedElement?.type === 'group'}
          canGroup={selectedElements.length > 1}
        />
      )}
    </div>
  );
};

export default ThreeHome;



