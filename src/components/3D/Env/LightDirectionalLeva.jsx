import { memo, useEffect, useRef } from 'react'
import { useControls, folder } from 'leva'
import { CameraHelper } from 'three'
import { useHelper } from '@react-three/drei'

function LightDirectional() {
  /////////////////////////////////////////////////////////////////////////////////////
  // LEVA Variables
  /////////////////////////////////////////////////////////////////////////////////////
  /**
   * Explore why some options don't auto update.  Might be VR render cycle.
   ***/
  const { dPosition, dIntensity, aIntensity, dHelper, cameraSize, shadowFar } = useControls(
    'Lights',
    {
      Directional: folder(
        {
          dPosition: { value: { x: 2, y: 5.5, z: -4 }, label: 'position' },
          dIntensity: {
            value: 1.25,
            min: 0,
            max: 5,
            step: 0.05,
            label: 'intensity'
          },
          Shadow: folder(
            {
              dHelper: { value: false, label: 'helper' },
              cameraSize: { value: 5, label: 'Size' },
              shadowFar: { value: 12, label: 'Far' }
            },
            { collapsed: true }
          )
        },
        { collapsed: true }
      ),
      Ambient: folder(
        {
          aIntensity: {
            value: 0.5,
            min: 0,
            max: 5,
            step: 0.05,
            label: 'intensity'
          }
        },
        { collapsed: true }
      )
    },
    { collapsed: true }
  )

  /////////////////////////////////////////////////////////////////////////////////////
  // Light References and Helper
  /////////////////////////////////////////////////////////////////////////////////////
  const dLight = useRef()
  const dCamera = useRef()
  useEffect(() => {
    if (dLight.current) {
      dCamera.current = dHelper ? dLight.current.shadow.camera : null
    }
  }, [dLight, dHelper])
  useHelper(dCamera, CameraHelper, 1, 'hotpink')

  return (
    <group>
      <directionalLight
        ref={dLight}
        intensity={dIntensity}
        position={[dPosition.x, dPosition.y, dPosition.z]}
        castShadow
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
        shadow-camera-far={shadowFar}
        shadow-camera-left={-cameraSize}
        shadow-camera-right={cameraSize}
        shadow-camera-top={cameraSize}
        shadow-camera-bottom={-cameraSize}
        shadow-bias={-0.005}
        shadow-radius={1}
      />
    </group>
  )
}

export default memo(LightDirectional)
