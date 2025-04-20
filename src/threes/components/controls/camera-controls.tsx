import { useThree, useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { OrthographicCamera, PerspectiveCamera, OrbitControls as DreiOrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useKeyboardControls } from '@/hooks/use-keyboard-controls'; // 引入自定义 Hook
import { useWheelZoom } from '@/hooks/use-wheel-zoom'; // 引入新的自定义 Hook
import { useSpaceDrag } from '@/hooks/use-space-drag'; // 引入空格拖动 Hook
import { forwardRef } from 'react';

interface CameraControlsProps {
  is2D: boolean;
}

export const CameraControls = forwardRef<any, CameraControlsProps>(({ is2D }, ref) => {
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

  // 同步forwardRef和内部ref
  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(controlsRef.current);
      } else {
        ref.current = controlsRef.current;
      }
    }
  }, [ref]);

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
        enableRotate={!is2D}
        enablePan={false}
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
});