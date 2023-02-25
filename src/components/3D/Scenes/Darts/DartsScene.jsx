import { memo, useContext, useEffect } from "react";
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
      </group>
    </group>
  );
}

export default memo(DartsScene);
