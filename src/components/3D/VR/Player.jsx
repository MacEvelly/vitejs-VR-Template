import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import {
  CapsuleCollider,
  RigidBody,
  useRapier
} from "@react-three/rapier";
import { useController, useXR } from "@react-three/xr";
import { useMemo, useRef, useState } from "react";
import { Vector3 } from "three";

export default function Player() {
  const player = useXR((state) => state.player);
  const leftController = useController("left");
  const rightController = useController("right");

  const horizontalAxis = 2;
  const forwardAxis = 3;
  const rotationAxis = 2;

  const size = 0.45;

  const [debugText, setDebugText] = useState("debug");

  const { camera } = useThree();

  const deadzone = 0.05;
  const SPEED = 5;
  let jump = false;
  const rotationSensitivity = 0.05;

  const rigidBodyApi = useRef();

  const direction = useMemo(() => new Vector3(), []);
  const cameraDirection = useMemo(() => new Vector3(), []);
  const frontVector = useMemo(() => new Vector3(), []);
  const sideVector = useMemo(() => new Vector3(), []);

  const { rapier, world } = useRapier();
  const rapierWorld = world.raw();

  const onJump = () => {
    const origin = rigidBodyApi.current.translation();
    // TODO: needs refining !
    origin.y -= size * 3;
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const hit = rapierWorld.castRay(ray, 20, true);

    const toi = (hit && hit.toi) ?? -1;

    // console.log(hit);
    setDebugText(
      `toi: ${toi.toPrecision(2)} origin: (${origin.x.toPrecision(
        2
      )} ${origin.y.toPrecision(2)} ${origin.z.toPrecision(2)})`
    );
    if (hit && hit.toi < 0.01) {
      // hit.toi !== 0 && alert(hit.toi);
      // rigidBodyApi.current.applyImpulse({ x: 0, y: 7.5, z: 0 });
      // OR:
      rigidBodyApi.current.setLinvel({ x: 0, y: 7.5, z: 0 });
    }
  };

  useFrame((state, delta) => {
    //  access current player state
    const velocity = rigidBodyApi.current.linvel();
    const pos = rigidBodyApi.current.translation();
    // const rot = rigidBodyApi.current.rotation();

    // update camera/vr-player
    player.position.set(pos.x, pos.y, pos.z);
    // player.rotation.setFromQuaternion(rot);

    // movement
    let [horizontal, vertical] = [0, 0];

    if (leftController) {
      const axes = leftController.inputSource.gamepad?.axes;
      if (axes) {
        vertical += axes[forwardAxis];
        horizontal -= axes[horizontalAxis];
      }
    }

    if (rightController) {
      // 'A' button pressed ? A Button is at index 4
      //  Button [0] => Trigger
      //  Button [1] => Grip
      //  Button [4] => A Button
      //  Button [5] => B Button
      const buttonA =
        rightController.inputSource.gamepad?.buttons.at(4) ?? false;
      jump = buttonA && (buttonA.pressed || buttonA.value > 0);

      const axes = rightController.inputSource.gamepad?.axes;

      if (axes) {
        const rotation_y =
          (Math.abs(axes[rotationAxis]) > deadzone ? axes[rotationAxis] : 0) *
          rotationSensitivity;

        // rigidBodyApi.current.applyTorqueImpulse(
        //   { x: 0, y: rotation_y, z: 0 },
        //   true
        // );

        player.rotation.y -= rotation_y;
      }
    }

    frontVector.set(0, 0, vertical);
    sideVector.set(horizontal, 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      // apply player rotation (works when rotating player, not when rotating your head)
      .applyEuler(player.rotation);
    // apply camera rotation ()
    // .applyEuler(camera.rotation);
    rigidBodyApi.current.setLinvel({
      x: direction.x,
      y: velocity.y,
      z: direction.z
    });

    if (jump) {
      onJump();
    }
  });

  return (
    <RigidBody
      position={[0, 1, 0]}
      ref={rigidBodyApi}
      restitution={0.2}
      friction={1}
      linearDamping={0.5}
      angularDamping={1}
      // onCollisionEnter={() => console.log("player bang")}
      // ccd={true}
      canSleep={false}
      colliders={false}
      enabledRotations={[false, true, false]}
      type="dynamic"
    >
      {/* <Text
        position={[0, 1, -2]}
        color="orangered"
        anchorX="center"
        anchorY="middle"
      >
        {debugText}
      </Text> */}
      <CapsuleCollider args={[size, size]} mass={68} />
    </RigidBody>
  );
}
