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
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const droneContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Obtenir la position actuelle du scroll
      const scrollTop = window.scrollY || document.documentElement.scrollTop || window.pageYOffset || 0;
      const windowHeight = window.innerHeight || 0;
      const documentHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        document.documentElement.offsetHeight,
        document.body.offsetHeight
      );

      // Structure de la page :
      // - Section 1 (DesktopScene) : fixed, occupe 0vh à 100vh (première viewport)
      // - Section 2 (Domain) : relative avec marginTop: 100vh, occupe 100vh à 200vh (deuxième viewport)
      // Le drone doit se déplacer pendant la transition entre les deux sections
      // Animation commence à 0vh (début de la page) et se termine à la fin de la section 2
      const startScroll = 0; // Début de la page
      // Utiliser la hauteur réelle du document ou 200vh, selon ce qui est le plus petit
      const endScroll = Math.min(windowHeight * 2, documentHeight - windowHeight);

      // Calculer la progression (0 = position initiale en haut à droite, 1 = position finale en bas à gauche)
      let progress = 0;
      if (windowHeight > 0 && endScroll > startScroll) {
        if (scrollTop <= startScroll) {
          progress = 0;
        } else if (scrollTop >= endScroll) {
          progress = 1;
        } else {
          const scrollRange = endScroll - startScroll;
          progress = scrollRange > 0 ? scrollTop / scrollRange : 0;
          // S'assurer que progress est entre 0 et 1
          progress = Math.max(0, Math.min(1, progress));
        }
      }

      // Debug: afficher la progression dans la console
      console.log('Scroll Progress:', progress.toFixed(3), 'ScrollTop:', scrollTop.toFixed(1), 'WindowHeight:', windowHeight, 'DocumentHeight:', documentHeight, 'Start:', startScroll, 'End:', endScroll.toFixed(1));

      setScrollProgress(progress);
    };

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      handleScroll();
    };

    // Écouter le scroll sur window
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Appeler une fois au chargement avec un petit délai pour s'assurer que le DOM est prêt
    setTimeout(handleScroll, 100);
    handleScroll();

    // Écouter les changements de taille de fenêtre
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Position du drone responsives
  const isMobile = windowSize.width <= 768;

  // Position premeire page (en haut à droite)
  const position1 = {
    top: isMobile ? 10 : -10,
    right: isMobile ? 20 : 100
  };

  // Position deuxième page (au centre gauche)
  const position2 = {
    top: isMobile ? windowSize.height * 0.5 : 90,
    right: isMobile ? windowSize.width * 0.6 : windowSize.width * 0.45
  };

  const currentTop = position1.top + (position2.top - position1.top) * scrollProgress;
  const currentRight = position1.right + (position2.right - position1.right) * scrollProgress;
  
  // Calculer le scale : de 1 (taille normale) à 1.4 (40% plus grand)
  const minScale = 1;
  const maxScale = 1.4;
  const currentScale = minScale + (maxScale - minScale) * scrollProgress;

  return (
    <>
      {/* Debug indicator - à retirer en production */}
      <div style={{
        position: 'fixed',
        top: '10px',
        left: '10px',
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '10px',
        zIndex: 9999,
        fontSize: '12px',
        fontFamily: 'monospace'
      }}>
        Progress: {(scrollProgress * 100).toFixed(1)}%
      </div>
      <div
        ref={droneContainerRef}
        className="drone-container"
        style={{
          top: `${currentTop}px`,
          right: `${currentRight}px`,
          opacity: 1,
          transform: `scale(${currentScale})`,
          transformOrigin: 'center center',
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
    </>
  );
};

export default Drone;