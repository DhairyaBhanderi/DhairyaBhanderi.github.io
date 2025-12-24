import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

interface ParticlesProps {
  count?: number;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

function Particles({ count = 3000, mouse }: ParticlesProps) {
  const points = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Spread particles across a larger area
      positions[i3] = (Math.random() - 0.5) * 15;
      positions[i3 + 1] = (Math.random() - 0.5) * 15;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      // Copper to ivory color gradient
      const t = Math.random();
      // Copper: hsl(24, 50%, 55%) = rgb(204, 136, 102)
      // Ivory: hsl(40, 20%, 95%) = rgb(247, 243, 235)
      colors[i3] = THREE.MathUtils.lerp(0.8, 0.97, t);
      colors[i3 + 1] = THREE.MathUtils.lerp(0.53, 0.95, t);
      colors[i3 + 2] = THREE.MathUtils.lerp(0.4, 0.92, t);
    }

    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;

    const time = state.clock.getElapsedTime();

    // Slow rotation
    points.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    points.current.rotation.y = time * 0.05;

    // Mouse influence
    const mouseX = (mouse.current.x / window.innerWidth) * 2 - 1;
    const mouseY = -(mouse.current.y / window.innerHeight) * 2 + 1;

    points.current.rotation.x += mouseY * 0.01;
    points.current.rotation.y += mouseX * 0.01;

    // Subtle breathing effect
    const scale = 1 + Math.sin(time * 0.5) * 0.02;
    points.current.scale.setScalar(scale);
  });

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function FloatingGeometry({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    
    const time = state.clock.getElapsedTime();
    
    mesh.current.rotation.x = time * 0.1;
    mesh.current.rotation.y = time * 0.15;
    
    // Mouse influence
    const mouseX = (mouse.current.x / window.innerWidth) * 2 - 1;
    const mouseY = -(mouse.current.y / window.innerHeight) * 2 + 1;
    
    mesh.current.position.x = mouseX * 0.5;
    mesh.current.position.y = mouseY * 0.5;
  });

  return (
    <mesh ref={mesh} position={[0, 0, -2]}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshBasicMaterial
        color="#C17F59"
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}

interface ParticleFieldProps {
  className?: string;
}

export const ParticleField = ({ className }: ParticleFieldProps) => {
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouse.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <div 
      className={className} 
      onMouseMove={handleMouseMove}
      style={{ touchAction: "none" }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <ambientLight intensity={0.5} />
        <Particles mouse={mouse} count={2000} />
        <FloatingGeometry mouse={mouse} />
      </Canvas>
    </div>
  );
};

export default ParticleField;
