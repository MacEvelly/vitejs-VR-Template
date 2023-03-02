import { Image } from "@react-three/drei";
import { memo, useContext, useEffect } from "react";
import { Poster } from "../../../../assets";
import { context } from "../../Models";

function DartsScene(props) {
  const { Dart, DartBoard } = useContext(context);
  return (
    <group {...props}>
      <group position-y={0.5}>
        <Dart rotation-x={Math.PI * 0.5} position-x={-0.25} />
        <Dart rotation-x={Math.PI * 0.5} position-x={0.25} />
        <Dart rotation-x={Math.PI * 0.5} />
        <DartBoard position-z={-1}/>
        <Image url={Poster} position={[-1.5,0.5,-1 ]} scale={[1,1.455,1]}  />
      </group>
    </group>
  );
}

export default memo(DartsScene);
