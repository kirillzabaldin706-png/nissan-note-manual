"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Html,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";
import { carHotspots } from "@/data/sections";
import Link from "next/link";

// Simple procedural car shape as placeholder until real GLB is available
function PlaceholderCar({
  onHotspotClick,
}: {
  onHotspotClick?: (slug: string) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
    }
  });

  return (
    <group ref={group} position={[0, -0.4, 0]} scale={1.1}>
      {/* Body */}
      <mesh castShadow receiveShadow position={[0, 0.35, 0]}>
        <boxGeometry args={[1.8, 0.55, 3.6]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.25} />
      </mesh>

      {/* Cabin */}
      <mesh castShadow position={[0, 0.85, -0.15]}>
        <boxGeometry args={[1.55, 0.55, 1.9]} />
        <meshStandardMaterial color="#111111" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Windows (glass-like) */}
      <mesh position={[0, 0.9, -0.15]}>
        <boxGeometry args={[1.45, 0.45, 1.8]} />
        <meshStandardMaterial
          color="#88aacc"
          transparent
          opacity={0.35}
          metalness={0.9}
          roughness={0.05}
        />
      </mesh>

      {/* Wheels */}
      {[
        [-0.85, 0.28, 1.15],
        [0.85, 0.28, 1.15],
        [-0.85, 0.28, -1.15],
        [0.85, 0.28, -1.15],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.32, 0.32, 0.22, 24]} />
            <meshStandardMaterial color="#111" roughness={0.8} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.18, 0.18, 0.24, 16]} />
            <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Headlights */}
      <mesh position={[-0.55, 0.4, 1.82]}>
        <boxGeometry args={[0.35, 0.15, 0.08]} />
        <meshStandardMaterial
          color="#ffffee"
          emissive="#ffffaa"
          emissiveIntensity={0.6}
        />
      </mesh>
      <mesh position={[0.55, 0.4, 1.82]}>
        <boxGeometry args={[0.35, 0.15, 0.08]} />
        <meshStandardMaterial
          color="#ffffee"
          emissive="#ffffaa"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Hotspots */}
      {carHotspots.map((hs) => (
        <group key={hs.id} position={hs.position}>
          <mesh
            onPointerOver={() => setHovered(hs.id)}
            onPointerOut={() => setHovered(null)}
            onClick={() => onHotspotClick?.(hs.sectionSlug)}
          >
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color={hovered === hs.id ? "#c3002f" : "#ffffff"}
              emissive={hovered === hs.id ? "#c3002f" : "#ffffff"}
              emissiveIntensity={hovered === hs.id ? 0.8 : 0.3}
              transparent
              opacity={0.9}
            />
          </mesh>
          {hovered === hs.id && (
            <Html distanceFactor={8} position={[0, 0.2, 0]} center>
              <div className="whitespace-nowrap rounded-md bg-zinc-900/90 px-2.5 py-1 text-xs font-medium text-white shadow-lg backdrop-blur">
                {hs.label}
              </div>
            </Html>
          )}
        </group>
      ))}
    </group>
  );
}

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-600 border-t-[#c3002f]" />
        <span className="text-xs text-zinc-400">Загрузка 3D-модели...</span>
      </div>
    </Html>
  );
}

interface CarViewerProps {
  className?: string;
  onHotspotClick?: (sectionSlug: string) => void;
}

export function CarViewer({ className, onHotspotClick }: CarViewerProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [3.5, 1.8, 4.5], fov: 40 }}
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-3, 4, -2]} intensity={0.3} />

        <Suspense fallback={<Loader />}>
          <PlaceholderCar onHotspotClick={onHotspotClick} />
          <ContactShadows
            position={[0, -0.4, 0]}
            opacity={0.45}
            scale={12}
            blur={2.5}
            far={4}
          />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.1}
          minDistance={3}
          maxDistance={9}
          target={[0, 0.3, 0]}
        />
      </Canvas>
    </div>
  );
}
