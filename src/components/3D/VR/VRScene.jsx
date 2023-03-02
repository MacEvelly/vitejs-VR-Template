import { Debug, Physics, RigidBody } from "@react-three/rapier";
import { Euler } from "three";
import { Controllers, Hands, VRButton, XR } from "@react-three/xr";
import RapierPlayer from "./Player";

export const Platform = ({
  position,
  rotation = new Euler(),
  size,
  color = "greenyellow",
}) => {
  return (
    <RigidBody type="fixed" restitution={0.5} friction={0.7}>
      <mesh receiveShadow castShadow position={position} rotation={rotation}>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} />
      </mesh>
    </RigidBody>
  );
};

export default function VRScene({ sound = false }) {
  return (
    <XR>
      <Controllers />
      <Hands />
      <Physics>
        <Debug />

        {/* Wall */}
        <Platform
          position={[-4.75, 1, 0]}
          size={[0.5, 2, 10]}
          color="orangered"
        />
        <Platform
          position={[0, 1, -4.75]}
          size={[10, 2, 0.5]}
          color="orangered"
        />

        {/* Top floor */}
        <Platform position={[0, -0.25, 0]} size={[10, 0.5, 10]} />

        {/* Steps */}
        <Platform position={[2.5, -2.25, 7.5]} size={[5, 0.5, 5]} />
        <Platform position={[7.5, -4.25, 7.5]} size={[5, 0.5, 5]} />
        <Platform position={[7.5, -6.25, 2.5]} size={[5, 0.5, 5]} />
        <Platform position={[2.5, -8.25, 2.5]} size={[5, 0.5, 5]} />

        {/* 2nd floor */}
        <Platform position={[0, -10.25, 0]} size={[50, 0.5, 50]} />

        {/* First Person player */}
        <RapierPlayer />
      </Physics>
    </XR>
  );
}
