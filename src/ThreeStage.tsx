import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

export type SceneVariant = 'hero' | 'network' | 'globe' | 'campus' | 'timeline';

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return reduced;
}


function useQualityTier() {
  const [tier, setTier] = useState<'mobile' | 'tablet' | 'desktop'>(() => window.innerWidth < 600 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop');
  useEffect(() => {
    const update = () => setTier(window.innerWidth < 600 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop');
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);
  return tier;
}

function ParticleField({ count = 320 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const r = 2.6 + Math.random() * 5.6;
      const a = Math.random() * Math.PI * 2;
      const b = Math.acos(2 * Math.random() - 1);
      array[i * 3] = r * Math.sin(b) * Math.cos(a);
      array[i * 3 + 1] = r * Math.cos(b);
      array[i * 3 + 2] = r * Math.sin(b) * Math.sin(a);
    }
    return array;
  }, [count]);
  const reduced = useReducedMotion();
  useFrame((_, delta) => {
    if (!reduced && points.current) points.current.rotation.y += delta * 0.025;
  });
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#8deaff" size={0.025} transparent opacity={0.62} sizeAttenuation />
    </points>
  );
}

function FloatingCore() {
  const group = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();
  useFrame((state, delta) => {
    if (!group.current || reduced) return;
    group.current.rotation.x += delta * 0.06 + state.pointer.y * delta * 0.08;
    group.current.rotation.y += delta * 0.11 + state.pointer.x * delta * 0.12;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.16;
  });
  return (
    <group ref={group}>
      <mesh rotation={[0.4, 0.6, 0.2]}>
        <icosahedronGeometry args={[1.32, 2]} />
        <meshPhysicalMaterial color="#0b234b" metalness={0.55} roughness={0.12} transmission={0.16} thickness={0.8} emissive="#03142e" />
      </mesh>
      <mesh scale={1.48} rotation={[0.3, -0.25, 0.1]}>
        <torusGeometry args={[1.25, 0.018, 16, 140]} />
        <meshBasicMaterial color="#6ae8ff" transparent opacity={0.76} />
      </mesh>
      <mesh scale={1.85} rotation={[1.1, 0.2, 0.7]}>
        <torusGeometry args={[1.1, 0.01, 12, 120]} />
        <meshBasicMaterial color="#2c83ff" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function Globe() {
  const root = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();
  const nodes = useMemo(() => Array.from({ length: 22 }, (_, index) => {
    const phi = Math.acos(-1 + (2 * index) / 22);
    const theta = Math.sqrt(22 * Math.PI) * phi;
    const r = 1.58;
    return [r * Math.cos(theta) * Math.sin(phi), r * Math.sin(theta) * Math.sin(phi), r * Math.cos(phi)] as [number, number, number];
  }), []);
  useFrame((state, delta) => {
    if (!reduced && root.current) { root.current.rotation.y += delta * 0.08 + state.pointer.x * delta * 0.08; root.current.rotation.x = 0.08 + state.pointer.y * 0.08; }
  });
  return (
    <group ref={root} rotation={[0.08, 0, -0.18]}>
      <mesh>
        <sphereGeometry args={[1.5, 36, 36]} />
        <meshPhysicalMaterial color="#071d3a" transparent opacity={0.65} wireframe roughness={0.4} metalness={0.25} />
      </mesh>
      {nodes.map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[index % 5 === 0 ? 0.055 : 0.03, 10, 10]} />
          <meshBasicMaterial color={index % 5 === 0 ? '#ffffff' : '#66e6ff'} />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2.8, 0, 0]}>
        <torusGeometry args={[1.8, 0.012, 10, 140]} />
        <meshBasicMaterial color="#3b8fff" transparent opacity={0.48} />
      </mesh>
    </group>
  );
}

function Network() {
  const group = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();
  const points = useMemo<[number, number, number][]>(() => [
    [-1.6, 0.9, 0.2], [-0.65, 1.25, -0.4], [0.45, 1.05, 0.45], [1.45, 0.6, -0.2],
    [-1.3, -0.25, -0.5], [-0.25, 0.05, 0.6], [0.9, -0.25, -0.3], [1.6, -0.8, 0.45],
    [-0.75, -1.15, 0.25], [0.35, -1.05, -0.55]
  ], []);
  const lineGeometry = useMemo(() => {
    const pairs: number[] = [];
    for (let i = 0; i < points.length - 1; i += 1) {
      pairs.push(...points[i], ...points[i + 1]);
      if (i + 3 < points.length && i % 2 === 0) pairs.push(...points[i], ...points[i + 3]);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(pairs, 3));
    return geometry;
  }, [points]);
  useFrame((state) => {
    if (!reduced && group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.2 + state.pointer.x * 0.16;
      group.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.18) * 0.08 + state.pointer.y * 0.1;
    }
  });
  return (
    <group ref={group}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#347eff" transparent opacity={0.54} />
      </lineSegments>
      {points.map((position, index) => (
        <mesh key={index} position={position} scale={index === 5 ? 1.45 : 1}>
          <octahedronGeometry args={[0.12, 0]} />
          <meshPhysicalMaterial color={index === 5 ? '#e8fcff' : '#53dfff'} emissive="#062e4a" roughness={0.2} metalness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function Campus() {
  const group = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();
  useFrame((state) => {
    if (!reduced && group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.1 + state.pointer.x * 0.12;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.06;
    }
  });
  const buildings = [
    [-1.4, -0.55, 0.25, 0.85, 1.5, 0.85], [-0.35, -0.35, -0.55, 0.7, 1.9, 0.7], [0.65, -0.62, 0.15, 1.1, 1.25, 0.9], [1.45, -0.75, -0.6, 0.55, 0.95, 0.55]
  ];
  return (
    <group ref={group} rotation={[-0.22, -0.45, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.3, 0]}>
        <circleGeometry args={[3.4, 64]} />
        <meshPhysicalMaterial color="#061128" roughness={0.42} metalness={0.2} transparent opacity={0.86} />
      </mesh>
      {buildings.map(([x,y,z,w,h,d], index) => (
        <mesh key={index} position={[x, y, z]}>
          <boxGeometry args={[w,h,d]} />
          <meshPhysicalMaterial color={index === 1 ? '#113d77' : '#0c2550'} roughness={0.18} metalness={0.35} emissive="#02132d" />
        </mesh>
      ))}
      <mesh position={[0.45,-1.08,-1.05]} rotation={[-Math.PI/2,0,0]}>
        <torusGeometry args={[0.55,0.045,10,48,Math.PI*1.5]} />
        <meshBasicMaterial color="#62e8ff" />
      </mesh>
    </group>
  );
}

function Timeline() {
  const group = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();
  const steps = useMemo(() => Array.from({ length: 7 }, (_, i) => ({
    x: -1.8 + i * 0.6,
    y: -1.0 + i * 0.32,
    z: (i % 2 === 0 ? 0.25 : -0.25)
  })), []);
  useFrame((state) => {
    if (!reduced && group.current) group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.16 + state.pointer.x * 0.12;
  });
  return (
    <group ref={group} rotation={[0.12, -0.3, -0.04]}>
      {steps.map((step, index) => (
        <mesh key={index} position={[step.x, step.y, step.z]}>
          <boxGeometry args={[0.52, 0.18, 0.78]} />
          <meshPhysicalMaterial color={index === steps.length - 1 ? '#76ebff' : '#0d3269'} emissive="#031a3c" metalness={0.35} roughness={0.22} />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ variant, quality }: { variant: SceneVariant; quality: 'mobile' | 'tablet' | 'desktop' }) {
  const particleCount = quality === 'mobile' ? (variant === 'hero' ? 130 : 80) : quality === 'tablet' ? (variant === 'hero' ? 240 : 140) : (variant === 'hero' ? 430 : 240);
  return (
    <>
      <ambientLight intensity={0.45} />
      <pointLight position={[4, 5, 5]} intensity={18} color="#63dfff" />
      <pointLight position={[-5, -2, 2]} intensity={9} color="#265eff" />
      <spotLight position={[0, 6, -2]} angle={0.7} penumbra={1} intensity={12} color="#ffffff" />
      <ParticleField count={particleCount} />
      {variant === 'hero' && <FloatingCore />}
      {variant === 'globe' && <Globe />}
      {variant === 'network' && <Network />}
      {variant === 'campus' && <Campus />}
      {variant === 'timeline' && <Timeline />}
    </>
  );
}

export default function ThreeStage({ variant = 'hero', className = '' }: { variant?: SceneVariant; className?: string }) {
  const quality = useQualityTier();
  return (
    <div className={`three-stage ${className}`} aria-hidden="true">
      <Canvas
        dpr={quality === 'mobile' ? [1, 1.15] : quality === 'tablet' ? [1, 1.4] : [1, 1.7]}
        camera={{ position: [0, 0, 5.4], fov: 44 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <fog attach="fog" args={['#040814', 5.5, 12]} />
        <Scene variant={variant} quality={quality} />
      </Canvas>
    </div>
  );
}
