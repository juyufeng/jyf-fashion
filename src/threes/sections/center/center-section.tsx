import { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { InfiniteGrid } from '@/threes/components/grid/infinite-grid';
import { CameraControls } from '@/threes/components/controls/camera-controls';
import RulerCanvas from '@/threes/components/ruler/ruler-canvas';
import { useWindowSize } from '@/hooks/use-window-size';

const CenterSection = () => {
  const [is2D, setIs2D] = useState(true);
  const controlsRef = useRef<any>(null);
  const { centerWidth, centerHeight } = useWindowSize();

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <RulerCanvas
        width={centerWidth}
        height={centerHeight}
        mainCamera={controlsRef.current?.object}
        controls={controlsRef.current}
      />
      <button
        style={{ position: 'absolute', zIndex: 10, left: 20, top: 20 }}
        onClick={() => setIs2D(v => !v)}
      >
        当前{is2D ? '2D' : '3D'}
      </button>
      <Canvas
        orthographic={is2D}
        camera={
          is2D
            ? { position: [0, 0, 1000], up: [0, 1, 0], zoom: 10, near: 0.1, far: 5000 }
            : { position: [0, 0, 1000], up: [0, 1, 0], fov: 50, near: 0.1, far: 5000 }
        }
        style={{ width: centerWidth, height: centerHeight }}
      >
        <CameraControls is2D={is2D} ref={controlsRef} />
        <InfiniteGrid cellSize={20} color={0x888888} fade thickness={1} />
      </Canvas>
    </div>
  );
};

export default CenterSection;