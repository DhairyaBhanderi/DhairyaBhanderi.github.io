import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

interface Skill {
  name: string;
  category: "ai" | "devops" | "frontend" | "backend";
  level: number;
}

const skills: Skill[] = [
  { name: "Python", category: "backend", level: 95 },
  { name: "React", category: "frontend", level: 90 },
  { name: "TypeScript", category: "frontend", level: 88 },
  { name: "FastAPI", category: "backend", level: 92 },
  { name: "LangChain", category: "ai", level: 90 },
  { name: "Docker", category: "devops", level: 85 },
  { name: "Kubernetes", category: "devops", level: 80 },
  { name: "AWS", category: "devops", level: 82 },
  { name: "PostgreSQL", category: "backend", level: 88 },
  { name: "TensorFlow", category: "ai", level: 75 },
  { name: "OpenAI", category: "ai", level: 92 },
  { name: "Redis", category: "backend", level: 78 },
  { name: "GraphQL", category: "backend", level: 80 },
  { name: "Node.js", category: "backend", level: 85 },
  { name: "Tailwind", category: "frontend", level: 90 },
  { name: "Git", category: "devops", level: 92 },
];

const categoryColors: Record<string, string> = {
  ai: "#D97706", // copper/orange for AI
  devops: "#3B82F6", // blue for DevOps
  frontend: "#14B8A6", // teal for Frontend
  backend: "#8B5CF6", // purple for Backend
};

interface SkillNodeProps {
  skill: Skill;
  position: [number, number, number];
  onHover: (skill: Skill | null) => void;
}

const SkillNode = ({ skill, position, onHover }: SkillNodeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const color = categoryColors[skill.category];

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={position}>
        {/* Skill sphere */}
        <mesh
          ref={meshRef}
          onPointerEnter={() => {
            setHovered(true);
            onHover(skill);
          }}
          onPointerLeave={() => {
            setHovered(false);
            onHover(null);
          }}
        >
          <sphereGeometry args={[0.15 + skill.level * 0.002, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 0.8 : 0.3}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>

        {/* Skill label */}
        <Text
          position={[0, 0.35, 0]}
          fontSize={0.12}
          color={hovered ? "#ffffff" : "#888888"}
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-medium.woff"
        >
          {skill.name}
        </Text>

        {/* Glow effect on hover */}
        {hovered && (
          <mesh>
            <sphereGeometry args={[0.25 + skill.level * 0.002, 16, 16]} />
            <meshBasicMaterial color={color} transparent opacity={0.15} />
          </mesh>
        )}
      </group>
    </Float>
  );
};

const SphereContent = ({ onHover }: { onHover: (skill: Skill | null) => void }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Calculate positions on a sphere
  const positions = useMemo(() => {
    return skills.map((_, index) => {
      const phi = Math.acos(-1 + (2 * index) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      const radius = 2.5;

      return [
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi),
      ] as [number, number, number];
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central core */}
      <mesh>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial
          color="#D97706"
          emissive="#D97706"
          emissiveIntensity={0.5}
          wireframe
        />
      </mesh>

      {/* Skill nodes */}
      {skills.map((skill, index) => (
        <SkillNode
          key={skill.name}
          skill={skill}
          position={positions[index]}
          onHover={onHover}
        />
      ))}

      {/* Connecting lines */}
      {positions.map((pos, index) => (
        <line key={`line-${index}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([0, 0, 0, ...pos])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#333333" transparent opacity={0.2} />
        </line>
      ))}
    </group>
  );
};

export const SkillsSphere = () => {
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-accent font-body text-sm uppercase tracking-widest mb-4 block">
            The Toolkit
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Technologies I Master
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Drag to explore • Hover for details
          </p>
        </motion.div>

        {/* 3D Sphere */}
        <div className="relative h-[500px] md:h-[600px]">
          <Canvas
            camera={{ position: [0, 0, 6], fov: 60 }}
            style={{ background: "transparent" }}
          >
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#D97706" />

            <SphereContent onHover={setHoveredSkill} />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI - Math.PI / 4}
            />
          </Canvas>

          {/* Skill info tooltip */}
          {hoveredSkill && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-md border border-border rounded-xl px-6 py-4 z-10"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: categoryColors[hoveredSkill.category] }}
                />
                <div>
                  <h4 className="font-display text-lg text-foreground">
                    {hoveredSkill.name}
                  </h4>
                  <p className="text-muted-foreground text-sm capitalize">
                    {hoveredSkill.category} • {hoveredSkill.level}% proficiency
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Category legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {Object.entries(categoryColors).map(([category, color]) => (
            <div key={category} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-muted-foreground font-body text-sm capitalize">
                {category === "ai" ? "AI / ML" : category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSphere;
