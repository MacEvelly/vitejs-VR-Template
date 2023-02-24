import { Canvas } from '@react-three/fiber';
import { memo } from 'react';
import { CameraLeva, GridLeva } from './Env';
import { XR } from '@react-three/xr';

function Scene3D() {
  return (
    <Canvas shadows camera={{ position: [10, 10, 15], fov: 25 }}>
      <XR>
        <CameraLeva />
        <GridLeva />
      </XR>
    </Canvas>
  );
}

export default memo(Scene3D);
