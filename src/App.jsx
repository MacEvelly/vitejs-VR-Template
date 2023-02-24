import './App.css';
import { MainScene } from './components/3D/Scenes';
import { VRButton } from '@react-three/xr';

function App() {
  return (
    <>
      <MainScene />
      <VRButton />
    </>
  );
}

export default App;
