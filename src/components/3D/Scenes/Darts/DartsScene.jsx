import { memo, useContext } from 'react';
import { context } from '../../Models';

function DartsScene(props) {
  const { Dart } = useContext(context);
  console.log('ran');
  return (
    <group {...props}>
      <Dart />
    </group>
  );
}

export default memo(DartsScene);
