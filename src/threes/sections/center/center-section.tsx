import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { InfiniteGrid } from '@/threes/components/infinite-grid';
import { CameraControls } from '@/threes/components/camera-controls';

const CenterSection = () => {
  const [is2D, setIs2D] = useState(true);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
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
        style={{ width: '100%', height: '100%' }}
      >
        <CameraControls is2D={is2D} />
        <InfiniteGrid cellSize={20} color={0x888888} fade thickness={1} />
      </Canvas>
    </div>
  );
};

export default CenterSection;