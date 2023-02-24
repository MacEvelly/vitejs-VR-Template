import { Canvas } from '@react-three/fiber';
import { memo, Suspense } from 'react';
import { CameraLeva, GridLeva } from './Env';
import { XR } from '@react-three/xr';
import { Instances } from '../3D/Models';

function Scene3D() {
  return (
    <Canvas shadows camera={{ position: [10, 10, 15], fov: 25 }}>
      <Suspense fallback={null}>
        <XR>
          <CameraLeva />
          <GridLeva />
          <Instances></Instances> 
        </XR>
      </Suspense>
    </Canvas>
  );
}

export default memo(Scene3D);
