import './App.css';
import Scene3D from './components/3D/Scene3D';
import { VRButton, XR } from '@react-three/xr';

function App() {
  return (
    <>
      <Scene3D />
      <VRButton />
    </>
  );
}

export default App;
