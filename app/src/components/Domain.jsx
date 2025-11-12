import { useRef, Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useFBX } from '@react-three/drei';
import * as THREE from 'three';
import './styles/Domain.css';

// Importer les modèles 3D depuis src/assets/3d
import androidModel from '../assets/3d/android.glb';
import buildingModel from '../assets/3d/building.glb';
import droneModel from '../assets/3d/drone2.fbx';
import phoneModel from '../assets/3d/phone.glb';

// Composant pour un modèle 3D avec hover (GLB)
function RotatingGLBModel({ modelPath, position, scale = [2, 2, 2], rotation = [0, 0, 0], onHoverChange }) {
  const groupRef = useRef();
  const { scene } = useGLTF(modelPath);
  const [isHovered, setIsHovered] = useState(false);
  const baseScale = useRef(scale);
  const currentScale = useRef(1); // Multiplicateur de scale pour le hover (1 = taille normale)
  const rotationY = useRef(rotation[1]); // Préserver la rotation Y initiale
  const baseRotation = useRef(rotation);

  // Animation uniquement au hover
  useFrame((state, delta) => {
    if (groupRef.current) {
      if (isHovered) {
        // Rotation au hover (ajout à la rotation de base)
        rotationY.current += delta * 0.5;
        groupRef.current.rotation.x = baseRotation.current[0];
        groupRef.current.rotation.y = rotationY.current;
        groupRef.current.rotation.z = baseRotation.current[2];
        
        // Agrandissement progressif au hover (très subtil)
        const targetScale = 1.05; // 5% d'augmentation
        currentScale.current = currentScale.current + (targetScale - currentScale.current) * 0.1;
        groupRef.current.scale.set(
          baseScale.current[0] * currentScale.current,
          baseScale.current[1] * currentScale.current,
          baseScale.current[2] * currentScale.current
        );
      } else {
        // Retour à la taille normale et rotation initiale
        currentScale.current = currentScale.current + (1 - currentScale.current) * 0.1;
        groupRef.current.scale.set(
          baseScale.current[0] * currentScale.current,
          baseScale.current[1] * currentScale.current,
          baseScale.current[2] * currentScale.current
        );
        groupRef.current.rotation.x = baseRotation.current[0];
        groupRef.current.rotation.y = baseRotation.current[1];
        groupRef.current.rotation.z = baseRotation.current[2];
        rotationY.current = baseRotation.current[1];
      }
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={position} 
      rotation={rotation}
      scale={baseScale.current}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setIsHovered(true);
        if (onHoverChange) onHoverChange(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setIsHovered(false);
        if (onHoverChange) onHoverChange(false);
        document.body.style.cursor = 'default';
      }}
    >
      <primitive
        object={scene.clone()}
      />
    </group>
  );
}

// Composant pour un modèle 3D avec hover (FBX)
function RotatingFBXModel({ modelPath, position, scale = [2, 2, 2], onHoverChange }) {
  const groupRef = useRef();
  const fbx = useFBX(modelPath);
  const [isHovered, setIsHovered] = useState(false);
  const baseScale = useRef(scale);
  const currentScale = useRef(1); // Multiplicateur de scale pour le hover (1 = taille normale)
  const rotationY = useRef(0);

  // Animation uniquement au hover
  useFrame((state, delta) => {
    if (groupRef.current) {
      if (isHovered) {
        // Rotation au hover
        rotationY.current += delta * 0.5;
        groupRef.current.rotation.y = rotationY.current;
        
        // Agrandissement progressif au hover (très subtil)
        const targetScale = 1.05; // 5% d'augmentation
        currentScale.current = currentScale.current + (targetScale - currentScale.current) * 0.1;
        groupRef.current.scale.set(
          baseScale.current[0] * currentScale.current,
          baseScale.current[1] * currentScale.current,
          baseScale.current[2] * currentScale.current
        );
      } else {
        // Retour à la taille normale et rotation initiale
        currentScale.current = currentScale.current + (1 - currentScale.current) * 0.1;
        groupRef.current.scale.set(
          baseScale.current[0] * currentScale.current,
          baseScale.current[1] * currentScale.current,
          baseScale.current[2] * currentScale.current
        );
        groupRef.current.rotation.y = 0;
        rotationY.current = 0;
      }
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={position}
      scale={baseScale.current}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setIsHovered(true);
        if (onHoverChange) onHoverChange(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setIsHovered(false);
        if (onHoverChange) onHoverChange(false);
        document.body.style.cursor = 'default';
      }}
    >
      <primitive
        object={fbx.clone()}
      />
    </group>
  );
}

// Composant pour le halo lumineux autour de l'objet
function LightBeam({ position, isHovered, targetPosition, size = 2 }) {
  const beamRef = useRef();
  const pointLightRef = useRef();
  const haloRef1 = useRef();
  const haloRef2 = useRef();
  const intensity = useRef(0);

  useFrame((state, delta) => {
    if (pointLightRef.current) {
      // Animation du fade in/out de l'intensité
      const targetIntensity = isHovered ? 5 : 0;
      intensity.current += (targetIntensity - intensity.current) * 0.1;
      pointLightRef.current.intensity = intensity.current;
    }
    
    // Mettre à jour l'opacité des halos avec des bordures très fondues
    if (haloRef1.current && haloRef1.current.material) {
      const opacity1 = intensity.current * 0.08; // Très transparent
      haloRef1.current.material.opacity = opacity1;
      haloRef1.current.material.emissiveIntensity = intensity.current * 0.3;
    }
    
    if (haloRef2.current && haloRef2.current.material) {
      const opacity2 = intensity.current * 0.05; // Encore plus transparent pour les bordures
      haloRef2.current.material.opacity = opacity2;
      haloRef2.current.material.emissiveIntensity = intensity.current * 0.2;
    }
  });

  return (
    <group ref={beamRef} position={targetPosition || position}>
      {/* PointLight qui illumine l'objet de tous les côtés */}
      <pointLight
        ref={pointLightRef}
        position={[0, 0, 0]}
        intensity={0}
        color="#ffffff"
        decay={1.5}
        distance={size * 3}
      />
      
      {/* Halo intérieur - plus intense */}
      <mesh 
        ref={haloRef1}
        position={[0, 0, 0]}
      >
        <sphereGeometry args={[size * 1.3, 32, 32]} />
        <meshStandardMaterial
          emissive="#ffffff"
          emissiveIntensity={0}
          transparent
          opacity={0}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Halo extérieur - bordures très fondues */}
      <mesh 
        ref={haloRef2}
        position={[0, 0, 0]}
      >
        <sphereGeometry args={[size * 1.8, 32, 32]} />
        <meshStandardMaterial
          emissive="#ffffff"
          emissiveIntensity={0}
          transparent
          opacity={0}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

// Composant pour la scène 3D
function Scene3D() {
  const [hoveredObjects, setHoveredObjects] = useState({
    android: false,
    building: false,
    drone: false,
    phone: false
  });

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
          position={[-11, -5, 0]} 
          scale={[12.5, 12.5, 12.5]}
          onHoverChange={(hovered) => setHoveredObjects(prev => ({ ...prev, android: hovered }))}
        />
        <RotatingGLBModel 
          modelPath={buildingModel} 
          position={[-3, -4, 0]} 
          scale={[0.4, 0.4, 0.4]}
          onHoverChange={(hovered) => setHoveredObjects(prev => ({ ...prev, building: hovered }))}
        />
        <RotatingFBXModel 
          modelPath={droneModel} 
          position={[3, -4, 0]} 
          scale={[0.0025, 0.0025, 0.0025]}
          onHoverChange={(hovered) => setHoveredObjects(prev => ({ ...prev, drone: hovered }))}
        />
        <RotatingGLBModel 
          modelPath={phoneModel} 
          position={[11, 0, 0]} 
          scale={[20, 20, 20]}
          rotation={[0.8, 0, 0.5]}
          onHoverChange={(hovered) => setHoveredObjects(prev => ({ ...prev, phone: hovered }))}
        />
        
        {/* Les 4 halos lumineux autour de chaque objet */}
        <LightBeam 
          targetPosition={[-11, -5, 0]}
          isHovered={hoveredObjects.android}
          size={3}
        />
        <LightBeam 
          targetPosition={[-3, -4, 0]}
          isHovered={hoveredObjects.building}
          size={1.5}
        />
        <LightBeam 
          targetPosition={[3, -4, 0]}
          isHovered={hoveredObjects.drone}
          size={1.5}
        />
        <LightBeam 
          targetPosition={[11, 0, 0]}
          isHovered={hoveredObjects.phone}
          size={4}
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

