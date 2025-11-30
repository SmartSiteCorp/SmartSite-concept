import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import * as THREE from "three";

import "./styles/Domain.css";
import "./styles/fonts.css";

import ColorBends from "./ColorBends";
import rockImage from "../assets/desktop/rock.png";

// Modèles 3D
import androidModel from "../assets/3d/android.glb";
import buildingModel from "../assets/3d/building.glb";
import phoneModel from "../assets/3d/phone.glb";

function AnimatedText({ text, isHovered }) {
  const lines = text.split("<br/>");

  return (
    <div className="animated-text-container">
      {lines.map((line, index) => (
        <div
          key={index}
          className={`animated-button ${isHovered ? "hovered" : ""}`}
        >
          <span className="actual-text">&nbsp;{line}&nbsp;</span>
          <span aria-hidden="true" className="front-text">
            &nbsp;{line}&nbsp;
          </span>
        </div>
      ))}
    </div>
  );
}

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
      <Html position={textPosition} center>
        <AnimatedText text={text} isHovered={isHovered} />
      </Html>

      <mesh
        ref={meshRef}
        position={position}
        onPointerEnter={(e) => {
          e.stopPropagation();
          setIsHovered(true);
          if (onHoverChange) onHoverChange(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();
          setIsHovered(false);
          if (onHoverChange) onHoverChange(false);
          document.body.style.cursor = "default";
        }}
      >
        <planeGeometry args={size} />
        <meshBasicMaterial
          color="#f3f3f3"
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function RotatingGLBModel({
  modelPath,
  position,
  scale = [2, 2, 2],
  rotation = [0, 0, 0],
  isHovered,
}) {
  const groupRef = useRef();
  const { scene } = useGLTF(modelPath);
  const baseScale = useRef(scale);
  const currentScale = useRef(1);
  const rotationY = useRef(rotation[1]);
  const baseRotation = useRef(rotation);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (isHovered) {
      rotationY.current += delta * 0.5;
      groupRef.current.rotation.x = baseRotation.current[0];
      groupRef.current.rotation.y = rotationY.current;
      groupRef.current.rotation.z = baseRotation.current[2];

      const targetScale = 1.05;
      currentScale.current =
        currentScale.current + (targetScale - currentScale.current) * 0.1;

      groupRef.current.scale.set(
        baseScale.current[0] * currentScale.current,
        baseScale.current[1] * currentScale.current,
        baseScale.current[2] * currentScale.current
      );
    } else {
      currentScale.current =
        currentScale.current + (1 - currentScale.current) * 0.1;

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

function Scene3D() {
  const [hoveredObjects, setHoveredObjects] = useState({
    android: false,
    building: false,
    phone: false,
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />

      <Suspense fallback={null}>
        {/* Android - IA */}
        <HoverRectangle
          position={[-12.5, -7, -1]}
          size={[8, 17.5]}
          text="Intelligence<br/>Artificielle"
          textPosition={[-12.5, 3, 0]}
          onHoverChange={(hovered) =>
            setHoveredObjects((prev) => ({ ...prev, android: hovered }))
          }
        />
        <RotatingGLBModel
          modelPath={androidModel}
          position={[-12, -7.5, 0]}
          scale={[14.5, 14.5, 14.5]}
          isHovered={hoveredObjects.android}
        />

        {/* Building - RA */}
        <HoverRectangle
          position={[0, -6, -1]}
          size={[8, 12]}
          text="Réalité<br/>Augmentée"
          textPosition={[0, 3, 0]}
          onHoverChange={(hovered) =>
            setHoveredObjects((prev) => ({ ...prev, building: hovered }))
          }
        />
        <RotatingGLBModel
          modelPath={buildingModel}
          position={[0, -6, 0]}
          scale={[0.4, 0.4, 0.4]}
          isHovered={hoveredObjects.building}
        />

        {/* Phone - Web & Mobile */}
        <HoverRectangle
          position={[12.5, -4, -1]}
          size={[8, 5]}
          text="Développement<br/>Web & Mobile"
          textPosition={[12.5, 3, 0]}
          onHoverChange={(hovered) =>
            setHoveredObjects((prev) => ({ ...prev, phone: hovered }))
          }
        />
        <RotatingGLBModel
          modelPath={phoneModel}
          position={[12, -4, 0]}
          scale={[25, 25, 25]}
          rotation={[0.5, 0, 0.5]}
          isHovered={hoveredObjects.phone}
        />
      </Suspense>

      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </>
  );
}

// =========================
// Composant principal Domain
// =========================
const Domain = () => {
  const rockRef = useRef(null);
  const monitorWrapperRef = useRef(null);

  useEffect(() => {
    const rockEl = rockRef.current;
    const monitorEl = monitorWrapperRef.current;
    if (!rockEl || !monitorEl) return;

    const HIDE_DELAY_MS = 10;
    let hideTimeout = null;

    const update = () => {
      const scrolled = (window.scrollY || window.pageYOffset) > 0;

      if (scrolled) {
        rockEl.classList.add("visible");
        monitorEl.classList.add("visible");

        if (hideTimeout) {
          clearTimeout(hideTimeout);
          hideTimeout = null;
        }
      } else {
        if (!hideTimeout) {
          hideTimeout = setTimeout(() => {
            rockEl.classList.remove("visible");
            monitorEl.classList.remove("visible");
            hideTimeout = null;
          }, HIDE_DELAY_MS);
        }
      }
    };

    update();

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <section className="Rock">
      {/* Moniteur au-dessus du rocher */}
      <div className="domain-monitor-wrapper" ref={monitorWrapperRef}>
        <div className="domain-monitor-desk">
          <div className="domain-monitor">
            <div className="domain-monitor-stand">
              <div className="domain-monitor-stand-base" />
            </div>

            <div className="domain-monitor-frame">
              <div className="domain-monitor-bezel">
                <div className="domain-monitor-screen">
                  <div className="domain-monitor-screen-inner">
                    {/* Tu pourras mettre du contenu ici si tu veux */}
                  </div>
                </div>
              </div>
              <div className="domain-monitor-led" />
            </div>

            <div className="domain-monitor-brand">VR TECH</div>
          </div>
        </div>
      </div>

      {/* Rocher */}
      <img ref={rockRef} src={rockImage} alt="Rock" className="rock" />

      {/* Section Domain */}
      <div className="domain-section">
        <div className="domain-background">
          <ColorBends
            colors={[
              "#ff0066",
              "#ff6600",
              "#ffcc00",
              "#00ff66",
              "#0066ff",
              "#6600ff",
              "#ff00cc",
            ]}
            rotation={45}
            speed={0.5}
            scale={0.7}
            frequency={2}
            warpStrength={2.5}
            mouseInfluence={1.5}
            parallax={1}
            noise={0.05}
            transparent={true}
            style={{ width: "100%", height: "100%", minHeight: "100vh" }}
          />
        </div>

        <div className="domain-container">
          <h2 className="domain-title">NOS DOMAINES</h2>
          <div className="domain-canvas-wrapper">
            <Canvas
              camera={{ position: [0, 0, 15], fov: 50 }}
              style={{ width: "100%", height: "100%" }}
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
