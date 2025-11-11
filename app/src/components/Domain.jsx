import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useFBX } from '@react-three/drei';
import './styles/Domain.css';

// Importer les modèles 3D depuis src/assets/3d
import androidModel from '../assets/3d/android.glb';
import buildingModel from '../assets/3d/building.glb';
import droneModel from '../assets/3d/drone.fbx';
import phoneModel from '../assets/3d/phone.glb';

// Composant pour un modèle 3D qui tourne (GLB)
function RotatingGLBModel({ modelPath, position, scale = [2, 2, 2] }) {
  const groupRef = useRef();
  const { scene } = useGLTF(modelPath);

  // Faire tourner le modèle sur lui-même autour de son centre
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5; // Rotation lente
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <primitive
        object={scene.clone()}
        scale={scale}
      />
    </group>
  );
}

// Composant pour un modèle 3D qui tourne (FBX)
function RotatingFBXModel({ modelPath, position, scale = [2, 2, 2] }) {
  const groupRef = useRef();
  const fbx = useFBX(modelPath);

  // Faire tourner le modèle sur lui-même autour de son centre
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5; // Rotation lente
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <primitive
        object={fbx.clone()}
        scale={scale}
      />
    </group>
  );
}

// Composant pour la scène 3D
function Scene3D() {
  return (
    <>
      {/* Lumière ambiante */}
      <ambientLight intensity={0.5} />
      
      {/* Lumière directionnelle */}
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Lumière ponctuelle */}
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      
      {/* Les 4 modèles 3D alignés sur une ligne */}
      <Suspense fallback={null}>
        <RotatingGLBModel 
          modelPath={androidModel} 
          position={[-8, 0, 0]} 
          scale={[2, 2, 2]}
        />
        <RotatingGLBModel 
          modelPath={buildingModel} 
          position={[-3, 0, 0]} 
          scale={[0.2, 0.2, 0.2]}
        />
        <RotatingFBXModel 
          modelPath={droneModel} 
          position={[3, 0, 0]} 
          scale={[0.0009, 0.0009, 0.0009]}
        />
        <RotatingGLBModel 
          modelPath={phoneModel} 
          position={[8, 0, 0]} 
          scale={[20, 20, 20]}
        />
      </Suspense>
      
      {/* Contrôles de la caméra (désactivés pour que les objets restent fixes) */}
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </>
  );
}

const Domain = () => {
  return (
    <section className="domain-section">
      <div className="domain-container">
        <h2 className="domain-title">Nos Domaines</h2>
        <div className="domain-canvas-wrapper">
          <Canvas
            camera={{ position: [0, 0, 15], fov: 50 }}
            style={{ width: '100%', height: '100%' }}
          >
            <Scene3D />
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default Domain;

