import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useFBX } from '@react-three/drei';
import './styles/Drone.css';
import droneModel from '../assets/3d/drone2.fbx';

// Composant pour le modèle du drone avec animation
function AnimatedDrone() {
  const groupRef = useRef();
  const fbx = useFBX(droneModel);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (groupRef.current) {
      timeRef.current += delta;
      
      // Animation de flottement (mouvement vertical sinusoïdal) - réduit pour rester dans le cadre
      const floatY = -1 + Math.sin(timeRef.current * 0.8) * 0.2;
      groupRef.current.position.y = floatY;
      
      // Légère oscillation horizontale - réduit pour rester dans le cadre
      // Décalage de base vers la gauche (-0.5) + oscillation
      const floatX = -1.5 + Math.cos(timeRef.current * 0.6) * 0.15;
      groupRef.current.position.x = floatX;
    }
  });

  return (
    <group ref={groupRef} scale={[0.0025, 0.0025, 0.0025]} position={[-0.5, 0, 0]}>
      <primitive object={fbx.clone()} />
    </group>
  );
}

const Drone = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const droneContainerRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const domainSection = document.querySelector('.domain-section');
          if (!domainSection) {
            ticking = false;
            return;
          }

          // Obtenir la position de la section Domain
          const domainSectionTop = domainSection.offsetTop;
          
          // Obtenir la position actuelle du scroll
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const windowHeight = window.innerHeight;

          // Calculer la distance avant d'atteindre la section Domain
          // On commence l'animation 1200px avant la section pour un mouvement très progressif
          const startAnimation = Math.max(0, domainSectionTop - windowHeight - 1200);
          const endAnimation = domainSectionTop - 200;

          // Calculer la progression (0 = position initiale, 1 = position finale)
          let progress = 0;
          if (scrollTop < startAnimation) {
            progress = 0;
          } else if (scrollTop > endAnimation) {
            progress = 1;
          } else {
            progress = (scrollTop - startAnimation) / (endAnimation - startAnimation);
          }

          setScrollProgress(progress);
          ticking = false;
        });

        ticking = true;
      }
    };

    // Écouter le scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Appeler une fois au chargement
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={droneContainerRef}
      className="drone-container"
      style={{
        // Position de départ fixe
        top: '20px',
        right: '10rem',
        // Transformation pour créer le mouvement diagonal
        transform: `translate(${scrollProgress * -400}px, ${scrollProgress * 200}px)`,
        opacity: 1,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 100 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />
        <AnimatedDrone />
      </Canvas>
    </div>
  );
};

export default Drone;