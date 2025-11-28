import { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import './styles/Domain.css';
import './styles/fonts.css';
import ColorBends from './ColorBends';
import rockImage from '../assets/desktop/rock.png';
// Importer les modèles 3D depuis src/assets/3d
import androidModel from '../assets/3d/android.glb';
import buildingModel from '../assets/3d/building.glb';
import phoneModel from '../assets/3d/phone.glb';

// Composant pour le texte animé
function AnimatedText({ text, isHovered }) {
  // Séparer le texte en lignes
  const lines = text.split('<br/>');
  
  return (
    <div className="animated-text-container">
      {lines.map((line, index) => (
        <div key={index} className={`animated-button ${isHovered ? 'hovered' : ''}`}>
          <span className="actual-text">&nbsp;{line}&nbsp;</span>
          <span aria-hidden="true" className="front-text">&nbsp;{line}&nbsp;</span>
        </div>
      ))}
    </div>
  );
}

// Composant pour le rectangle de fond transparent avec texte
function HoverRectangle({ position, size, onHoverChange, text, textPosition }) {
  const meshRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const opacityRef = useRef(0);

  useFrame(() => {
    if (meshRef.current) {
      const targetOpacity = isHovered ? 0.0 : 0.0;
      opacityRef.current += (targetOpacity - opacityRef.current) * 0.1;
      meshRef.current.material.opacity = opacityRef.current;
    }
  });

  return (
    <group>
      {/* Texte HTML au-dessus du rectangle */}
      <Html position={textPosition} center>
        <AnimatedText text={text} isHovered={isHovered} />
      </Html>
      
      {/* Rectangle de fond */}
      <mesh
        ref={meshRef}
        position={position}
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
        <planeGeometry args={size} />
        <meshBasicMaterial color="#f3f3f3" transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// Composant pour un modèle 3D avec animation au hover
function RotatingGLBModel({ modelPath, position, scale = [2, 2, 2], rotation = [0, 0, 0], isHovered }) {
  const groupRef = useRef();
  const { scene } = useGLTF(modelPath);
  const baseScale = useRef(scale);
  const currentScale = useRef(1);
  const rotationY = useRef(rotation[1]);
  const baseRotation = useRef(rotation);

  useFrame((state, delta) => {
    if (groupRef.current) {
      if (isHovered) {
        // Rotation au hover
        rotationY.current += delta * 0.5;
        groupRef.current.rotation.x = baseRotation.current[0];
        groupRef.current.rotation.y = rotationY.current;
        groupRef.current.rotation.z = baseRotation.current[2];
        
        // Agrandissement progressif au hover
        const targetScale = 1.05;
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
    >
      <primitive object={scene.clone()} />
    </group>
  );
}

// Composant pour la scène 3D
function Scene3D() {
  const [hoveredObjects, setHoveredObjects] = useState({
    android: false,
    building: false,
    phone: false
  });

  return (
    <>
      {/* Lumière ambiante */}
      <ambientLight intensity={0.7} />
      
      {/* Lumière directionnelle */}
      <directionalLight position={[10, 10, 5]} intensity={2} />
      
      {/* Lumière ponctuelle */}
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      
      <Suspense fallback={null}>
        {/* Android - Intelligence Artificielle */}
        <HoverRectangle 
          position={[-12.5, -7, -1]} 
          size={[8, 17.5]}
          text="Intelligence<br/>Artificielle"
          textPosition={[-12.5, 3, 0]}
          onHoverChange={(hovered) => setHoveredObjects(prev => ({ ...prev, android: hovered }))}
        />
        <RotatingGLBModel 
          modelPath={androidModel} 
          position={[-12, -7.5, 0]} 
          scale={[14.5, 14.5, 14.5]}
          isHovered={hoveredObjects.android}
        />

        {/* Building - Réalité Augmentée */}
        <HoverRectangle 
          position={[0, -6, -1]} 
          size={[8, 12]}
          text="Réalité<br/>Augmentée"
          textPosition={[0, 3, 0]}
          onHoverChange={(hovered) => setHoveredObjects(prev => ({ ...prev, building: hovered }))}
        />
        <RotatingGLBModel 
          modelPath={buildingModel} 
          position={[0, -6, 0]} 
          scale={[0.4, 0.4, 0.4]}
          isHovered={hoveredObjects.building}
        />

        {/* Phone - Développement Web & Mobile */}
        <HoverRectangle 
          position={[12.5, -4, -1]} 
          size={[8, 5]}
          text="Développement<br/>Web & Mobile"
          textPosition={[12.5, 3, 0]}
          onHoverChange={(hovered) => setHoveredObjects(prev => ({ ...prev, phone: hovered }))}
        />
        <RotatingGLBModel 
          modelPath={phoneModel} 
          position={[12, -4, 0]} 
          scale={[25, 25, 25]}
          rotation={[0.5, 0, 0.5]}
          isHovered={hoveredObjects.phone}
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
  const rockRef = useRef(null);

  useEffect(() => {
    const el = rockRef.current;
    if (!el) return;

    const update = () => {
      if ((window.scrollY || window.pageYOffset) > 0) {
        el.classList.add('visible');
      } else {
        el.classList.remove('visible');
      }
    };

    // initial state
    update();

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section className="Rock">
    <img ref={rockRef} src={rockImage} alt="Rock" className="rock" />
    <div className="domain-section">
      {/* Background ColorBends */}
      <div className="domain-background">
        <ColorBends
          colors={["#ff0066", "#ff6600", "#ffcc00", "#00ff66", "#0066ff", "#6600ff", "#ff00cc"]}
          rotation={45}
          speed={0.5}
          scale={0.7}
          frequency={2}
          warpStrength={2.5}
          mouseInfluence={1.5}
          parallax={1}
          noise={0.05}
          transparent={true}
          style={{ width: '100%', height: '100%', minHeight: '100vh' }}
        />
      </div>

      {/* Contenu principal */}
      <div className="domain-container">
        <h2 className="domain-title">NOS DOMAINES</h2>
        <div className="domain-canvas-wrapper">
          <Canvas
            camera={{ position: [0, 0, 15], fov: 50 }}
            style={{ width: '100%', height: '100%' }}
          >
            <Scene3D />
          </Canvas>
        </div>
      </div>
    </div>
    </section>
  );
};

export default Domain;
