import './App.scss';

import { Canvas, useFrame } from 'react-three-fiber';
import { OrbitControls, softShadows, MeshWobbleMaterial } from 'drei';
import { useRef } from 'react';

softShadows();

function Box({position, args, color}) {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.02));

  return (
    <mesh castShadow ref={mesh} position={position}>
      <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
      <MeshWobbleMaterial attach="material" color={color} speed={1} factor={0.5}/>
    </mesh>
  );
}




function App() {
  
  return (
    <div className="App">
      <Canvas colorManagement shadowMap className="canvas">
        <Box position={[0, -3, -3]} color="red"/>
        <Box position={[0, 3, -3]} color="blue"/>
        <Box position={[3, 0, -3]} color="green"/>
        <Box position={[-3, 0, -3]} color="yellow"/>

        <group>
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
            <planeBufferGeometry attach="geometry" args={[100,100]}/>
            <shadowMaterial attach="material" opacity="0.3"/>
          </mesh>
        </group>


        <directionalLight 
          castShadow
          position={[20, 20, 10]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-down={-10}
        />
        <ambientLight intensity={0.3}/>
        <OrbitControls/>
      </Canvas>
    </div>
  );
}

export default App;
