import { Canvas } from '@react-three/fiber';
import { memo, Suspense } from 'react';
import { CameraLeva, GridLeva } from '../Env';
import { XR } from '@react-three/xr';
import { Instances } from '../Models';
import { DartsScene } from '.';

function MainScene() {
  console.log(DartsScene);
  return (
    <Canvas shadows camera={{ position: [10, 10, 15], fov: 25 }}>
      <Suspense fallback={null}>
        <XR>
          <CameraLeva />
          <GridLeva />
          {/* <Instances>{<DartsScene /></Instances> */}
        </XR>
      </Suspense>
    </Canvas>
  );
}

export default memo(MainScene);
