import React from 'react';
import { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import style from "./compstyles/mod.module.css";


const Model = () => {
  const gltf = useLoader(GLTFLoader, '/shirt.glb');
  // const gltf = useLoader(GLTFLoader, '/shirt_baked/scene.gltf');
  return (
    <>
      <primitive object={gltf.scene} scale={.26} position={[0, -5, 0]} />
      {/* <primitive object={gltf.scene} scale={15} position={[0, .5, 0]} /> */}
    </>
  );
};


const Mod = () => {


  return (
    <div className={style.main}>
      <div className={style.globe}>
        <Canvas shadows dpr={[1, 2]} camera={{ position: [4, 0, 10], fov: 60 }}>
          <ambientLight intensity={0.9} />
          <spotLight intensity={4.5} angle={0.2} penumbra={1} position={[10, 15, 10]} castShadow />
          <Suspense fallback={null}>
            <Model />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls autoRotate enableZoom={false} />
        </Canvas>
      </div>
    </div>
  );
};

export default Mod;
