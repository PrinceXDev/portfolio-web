"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null!);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;
    g.rotation.y += delta * 0.06;
    g.rotation.x = THREE.MathUtils.lerp(
      g.rotation.x,
      mousePos.current.y * 0.12,
      0.02,
    );
    g.position.x = THREE.MathUtils.lerp(
      g.position.x,
      mousePos.current.x * 0.4,
      0.02,
    );
  });

  const accent = "#c4f346";

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh>
          <icosahedronGeometry args={[2.8, 1]} />
          <meshBasicMaterial
            color={accent}
            wireframe
            transparent
            opacity={0.08}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh>
          <icosahedronGeometry args={[4.2, 1]} />
          <meshBasicMaterial
            color={accent}
            wireframe
            transparent
            opacity={0.04}
          />
        </mesh>
      </Float>

      <Float speed={2.2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[4.5, 1.8, -2]}>
          <octahedronGeometry args={[0.5]} />
          <meshBasicMaterial
            color={accent}
            wireframe
            transparent
            opacity={0.2}
          />
        </mesh>
      </Float>

      <Float speed={1.6} rotationIntensity={0.7} floatIntensity={1.2}>
        <mesh position={[-4, -1.5, 1.5]}>
          <torusGeometry args={[0.7, 0.2, 8, 24]} />
          <meshBasicMaterial
            color={accent}
            wireframe
            transparent
            opacity={0.15}
          />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={1.3} floatIntensity={0.6}>
        <mesh position={[3.5, -2.5, 2]}>
          <tetrahedronGeometry args={[0.45]} />
          <meshBasicMaterial
            color={accent}
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>
      </Float>

      <Float speed={1.0} rotationIntensity={0.5} floatIntensity={1.5}>
        <mesh position={[-4.5, 2.8, -1.5]}>
          <dodecahedronGeometry args={[0.6]} />
          <meshBasicMaterial
            color={accent}
            wireframe
            transparent
            opacity={0.12}
          />
        </mesh>
      </Float>

      <Float speed={1.4} rotationIntensity={0.9} floatIntensity={0.7}>
        <mesh position={[1.5, 3.5, -3]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshBasicMaterial
            color={accent}
            wireframe
            transparent
            opacity={0.18}
          />
        </mesh>
      </Float>
    </group>
  );
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function createParticlePositions(count: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = seededRandom(i * 3 + 1) * Math.PI * 2;
    const phi = Math.acos(seededRandom(i * 3 + 2) * 2 - 1);
    const r = 4 + seededRandom(i * 3 + 3) * 14;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

const PARTICLE_POSITIONS = createParticlePositions(300);

function Particles() {
  const ref = useRef<THREE.Points>(null!);

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(PARTICLE_POSITIONS, 3),
    );
    return geom;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.01;
      ref.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.02}
        color="#c4f346"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{ position: "absolute", inset: 0 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <FloatingShapes />
      <Particles />
    </Canvas>
  );
}
