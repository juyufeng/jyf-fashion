import { useThree, useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { OrthographicCamera, PerspectiveCamera, OrbitControls as DreiOrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useKeyboardControls } from '@/hooks/useKeyboardControls'; // 引入自定义 Hook
import { useWheelZoom } from '@/hooks/useWheelZoom'; // 引入新的自定义 Hook
import { useSpaceDrag } from '@/hooks/useSpaceDrag'; // 引入空格拖动 Hook

interface CameraControlsProps {
  is2D: boolean;
}

export const CameraControls: React.FC<CameraControlsProps> = ({ is2D }) => {
  const controlsRef = useRef<any>(null);
  const orthoRef = useRef<THREE.OrthographicCamera>(null);
  const perspRef = useRef<THREE.PerspectiveCamera>(null);
  
  const { camera, set } = useThree(); 

  useEffect(() => {
    if (is2D && orthoRef.current) {
      set({ camera: orthoRef.current });
    } else if (!is2D && perspRef.current) {
      set({ camera: perspRef.current });
    }
    controlsRef.current?.update();
  }, [is2D, set]);

  useKeyboardControls(camera); // 使用自定义 Hook
  useWheelZoom(camera); // 使用新的自定义 Hook
  useSpaceDrag(camera, controlsRef); // 使用空格拖动 Hook

  return (
    <>
      <OrthographicCamera
        ref={orthoRef}
        makeDefault={is2D}
        position={[0, 0, 1000]}
        zoom={1}
      />
      <PerspectiveCamera
        ref={perspRef}
        makeDefault={!is2D}
        position={[0, 0, 1000]}
        fov={50}
      />
      <DreiOrbitControls
        ref={controlsRef}
        camera={camera}
        enableRotate={!is2D} // 禁止旋转在2D模式下
        enablePan={false} // 初始禁用平移，由 useSpaceDrag 控制
        enableZoom={true}
        minZoom={0.1}
        maxZoom={10}
      />
      {/* 坐标轴和标注 */}
      <primitive object={new THREE.AxesHelper(100)} />
      <Html position={[110, 0, 0]} center style={{ color: 'red', fontWeight: 'bold' }}>X</Html>
      <Html position={[0, 110, 0]} center style={{ color: 'green', fontWeight: 'bold' }}>Y</Html>
      <Html position={[0, 0, 110]} center style={{ color: 'blue', fontWeight: 'bold' }}>Z</Html>
    </>
  );
};