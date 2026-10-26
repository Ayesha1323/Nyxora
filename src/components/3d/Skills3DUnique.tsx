import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { ALL_SKILLS, SKILL_CATEGORIES } from '../../data/portfolioData';
import { checkWebGLSupport } from '../../utils/webgl';
import { SkillItem } from '../../types/portfolio';
import { Disc3, Server, Hexagon, Globe } from 'lucide-react';

interface Skills3DUniqueProps {
  theme?: 'dark' | 'light';
  selectedCategory: string;
  onSelectSkill?: (skill: SkillItem | null) => void;
  hoveredSkill: SkillItem | null;
  setHoveredSkill: (skill: SkillItem | null) => void;
}

type LayoutMode = 'carousel' | 'tower' | 'hex' | 'globe';

export const Skills3DUnique: React.FC<Skills3DUniqueProps> = ({
  selectedCategory,
  onSelectSkill,
  hoveredSkill,
  setHoveredSkill
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('carousel');
  const [isInteracting, setIsInteracting] = useState(false);

  // Filter skills based on selected category
  const activeSkills = useMemo(() => {
    if (selectedCategory === 'all') return ALL_SKILLS;
    return ALL_SKILLS.filter(s => {
      const cat = SKILL_CATEGORIES.find(c => c.id === selectedCategory);
      return cat ? s.category === cat.name : true;
    });
  }, [selectedCategory]);

  useEffect(() => {
    const support = checkWebGLSupport();
    if (!support.supported || !mountRef.current) return;

    const container = mountRef.current;
    let width = container.clientWidth || 700;
    let height = container.clientHeight || 560;
    let animId: number;

    // 1. Scene & Camera Setup - Fog blends smoothly into cream white background
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xfdfbf7, 0.035);

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 9.6);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !support.isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(support.pixelRatio);
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // 3. Dynamic Studio Lighting Rig - Deep Purple & Violet
    const ambientLight = new THREE.AmbientLight(0xfff8f0, 1.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.2);
    mainLight.position.set(6, 10, 8);
    scene.add(mainLight);

    const purpleLight = new THREE.PointLight(0x581c87, 5.0, 20);
    purpleLight.position.set(-5, -2, 4);
    scene.add(purpleLight);

    const violetLight = new THREE.PointLight(0x9333ea, 4.5, 20);
    violetLight.position.set(5, 3, -2);
    scene.add(violetLight);

    // Master Group
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Holographic Cyber Pedestal (Deep purple foundation with neon violet ring)
    const platformGroup = new THREE.Group();
    worldGroup.add(platformGroup);
    platformGroup.position.y = -2.8;

    const baseRingGeo = new THREE.CylinderGeometry(4.2, 4.4, 0.2, 64);
    const baseRingMat = new THREE.MeshStandardMaterial({
      color: 0x2e1065,
      metalness: 0.95,
      roughness: 0.2
    });
    const baseDisk = new THREE.Mesh(baseRingGeo, baseRingMat);
    platformGroup.add(baseDisk);

    const ringNeonGeo = new THREE.TorusGeometry(4.25, 0.03, 16, 90);
    const ringNeonMat = new THREE.MeshBasicMaterial({
      color: 0x9333ea
    });
    const ringNeon = new THREE.Mesh(ringNeonGeo, ringNeonMat);
    ringNeon.rotation.x = Math.PI / 2;
    platformGroup.add(ringNeon);

    const innerCoreGeo = new THREE.CylinderGeometry(1.5, 1.5, 0.3, 32);
    const innerCoreMat = new THREE.MeshStandardMaterial({
      color: 0x1e082b,
      metalness: 0.9,
      roughness: 0.2
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    platformGroup.add(innerCore);

    // 4. Procedural High-Res Texture for 3D Cards - Deep Purple & Amethyst
    const createCardTexture = (skill: SkillItem, isHovered: boolean) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 180;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Outer Card Frame: Dark royal purple
        ctx.fillStyle = isHovered ? '#3b0764' : '#240733';
        ctx.roundRect(8, 8, 496, 164, 26);
        ctx.fill();

        // Border: Bold violet when hovered, subtle purple otherwise
        ctx.lineWidth = isHovered ? 5 : 3;
        ctx.strokeStyle = isHovered ? '#a855f7' : '#7c3aed';
        ctx.roundRect(8, 8, 496, 164, 26);
        ctx.stroke();

        // Left Accent Notch in Violet
        ctx.fillStyle = '#9333ea';
        ctx.roundRect(14, 16, 8, 148, 4);
        ctx.fill();

        // Glowing Icon Beacon
        ctx.beginPath();
        ctx.arc(68, 90, 20, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(147, 51, 234, 0.3)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(68, 90, 10, 0, Math.PI * 2);
        ctx.fillStyle = '#a855f7';
        ctx.fill();

        // Skill Name Text
        ctx.font = 'bold 44px "Space Grotesk", sans-serif';
        ctx.fillStyle = '#faf8f5';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(skill.name, 108, 68);

        // Category Tag
        ctx.font = 'bold 22px "JetBrains Mono", monospace';
        ctx.fillStyle = '#d8b4fe';
        ctx.fillText(skill.category.toUpperCase(), 108, 118);

        // Level Pill
        ctx.font = 'bold 22px "JetBrains Mono", monospace';
        ctx.fillStyle = '#c084fc';
        ctx.fillText(`• ${skill.level}% PROFICIENCY`, 270, 118);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return texture;
    };

    // 5. Construct 3D Cards
    interface SkillCardNode {
      group: THREE.Group;
      boxMesh: THREE.Mesh;
      borderMesh: THREE.LineSegments;
      skill: SkillItem;
      targetPos: THREE.Vector3;
      targetRot: THREE.Euler;
      texture: THREE.CanvasTexture;
      sideMat: THREE.MeshStandardMaterial;
      frontMat: THREE.MeshStandardMaterial;
    }

    const cardNodes: SkillCardNode[] = [];
    const count = activeSkills.length;

    const cW = 1.7;
    const cH = 0.6;
    const cD = 0.09;

    activeSkills.forEach((skill) => {
      const cardGroup = new THREE.Group();
      worldGroup.add(cardGroup);

      const boxGeo = new THREE.BoxGeometry(cW, cH, cD);
      const texture = createCardTexture(skill, hoveredSkill?.name === skill.name);

      const sideMat = new THREE.MeshStandardMaterial({
        color: 0x1e082b,
        metalness: 0.9,
        roughness: 0.2
      });

      const frontMat = new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 0.2,
        roughness: 0.35,
        transparent: true
      });

      const materials = [sideMat, sideMat, sideMat, sideMat, frontMat, frontMat];
      const boxMesh = new THREE.Mesh(boxGeo, materials);
      cardGroup.add(boxMesh);

      // 3D Glowing Edge Chamfer
      const edges = new THREE.EdgesGeometry(boxGeo);
      const edgeMat = new THREE.LineBasicMaterial({
        color: 0x7c3aed,
        transparent: true,
        opacity: 0.85
      });
      const borderMesh = new THREE.LineSegments(edges, edgeMat);
      cardGroup.add(borderMesh);

      cardNodes.push({
        group: cardGroup,
        boxMesh,
        borderMesh,
        skill,
        targetPos: new THREE.Vector3(),
        targetRot: new THREE.Euler(),
        texture,
        sideMat,
        frontMat
      });
    });

    // 6. Connective Guide Rungs & Struts
    const guideGroup = new THREE.Group();
    worldGroup.add(guideGroup);

    const updateGuides = () => {
      while (guideGroup.children.length > 0) {
        guideGroup.remove(guideGroup.children[0]);
      }

      if (layoutMode === 'carousel') {
        [-1.2, 0.4, 2.0].forEach((yPos) => {
          const ringGeo = new THREE.TorusGeometry(3.65, 0.012, 16, 90);
          const ringMat = new THREE.MeshBasicMaterial({
            color: 0x7c3aed,
            transparent: true,
            opacity: 0.3
          });
          const ringMesh = new THREE.Mesh(ringGeo, ringMat);
          ringMesh.rotation.x = Math.PI / 2;
          ringMesh.position.y = yPos;
          guideGroup.add(ringMesh);
        });
      } else if (layoutMode === 'tower') {
        const spineGeo = new THREE.CylinderGeometry(0.12, 0.12, 6.2, 16);
        const spineMat = new THREE.MeshStandardMaterial({
          color: 0x1e082b,
          metalness: 0.9,
          roughness: 0.2
        });
        const spine = new THREE.Mesh(spineGeo, spineMat);
        guideGroup.add(spine);
      } else if (layoutMode === 'globe') {
        const r = 3.65;
        const eqGeo = new THREE.TorusGeometry(r, 0.012, 16, 100);
        const eqMat = new THREE.MeshBasicMaterial({
          color: 0x7c3aed,
          transparent: true,
          opacity: 0.3
        });
        const eqMesh = new THREE.Mesh(eqGeo, eqMat);
        eqMesh.rotation.x = Math.PI / 2;
        guideGroup.add(eqMesh);
      }
    };

    // 7. Calculate Layout Coordinates
    const applyCoordinates = () => {
      cardNodes.forEach((node, i) => {
        if (layoutMode === 'carousel') {
          const tiers = 3;
          const tierIndex = i % tiers;
          const itemsInTier = Math.ceil(count / tiers);
          const indexInTier = Math.floor(i / tiers);

          const radius = 3.65;
          const angleStep = (Math.PI * 2) / itemsInTier;
          const angle = indexInTier * angleStep;

          const x = radius * Math.cos(angle);
          const y = (tierIndex - 1) * 1.55;
          const z = radius * Math.sin(angle);

          node.targetPos.set(x, y, z);
          node.targetRot.set(0, -angle + Math.PI / 2, 0);
        } else if (layoutMode === 'tower') {
          const wings = 4;
          const wing = i % wings;
          const slot = Math.floor(i / wings);
          const totalSlots = Math.ceil(count / wings);

          const angle = (wing * Math.PI * 2) / wings;
          const dist = 2.45;
          const x = dist * Math.cos(angle);
          const y = ((totalSlots - 1) / 2 - slot) * 1.15;
          const z = dist * Math.sin(angle);

          node.targetPos.set(x, y, z);
          node.targetRot.set(0, -angle + Math.PI / 2, 0);
        } else if (layoutMode === 'hex') {
          const cols = 4;
          const col = i % cols;
          const row = Math.floor(i / cols);
          const isOdd = row % 2 === 1;

          const x = (col - 1.5) * 2.1 + (isOdd ? 1.05 : 0);
          const y = (1.5 - row) * 1.35;
          const z = Math.cos(col * 0.9 + row * 0.7) * 1.1;

          node.targetPos.set(x, y, z);
          node.targetRot.set(0.1, Math.sin(col) * 0.15, 0);
        } else if (layoutMode === 'globe') {
          const phi = Math.PI * (Math.sqrt(5) - 1);
          const radius = 3.6;
          const yNorm = 1 - (i / Math.max(1, count - 1)) * 2;
          const radiusAtY = Math.sqrt(Math.max(0, 1 - yNorm * yNorm));
          const theta = phi * i;

          const x = Math.cos(theta) * radiusAtY * radius;
          const y = yNorm * radius * 0.9;
          const z = Math.sin(theta) * radiusAtY * radius;

          node.targetPos.set(x, y, z);
          const dummy = new THREE.Object3D();
          dummy.position.set(x, y, z);
          dummy.lookAt(x * 2, y * 2, z * 2);
          node.targetRot.copy(dummy.rotation);
        }
      });

      updateGuides();
    };

    applyCoordinates();

    // 8. Raycasting & Mouse Interaction
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    let isDragging = false;
    let prevPointer = { x: 0, y: 0 };
    let targetWorldRotY = 0;
    let targetWorldRotX = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsInteracting(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevPointer = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      pointer.x = ((clientX - rect.left) / width) * 2 - 1;
      pointer.y = -((clientY - rect.top) / height) * 2 + 1;

      if (isDragging) {
        const deltaX = clientX - prevPointer.x;
        const deltaY = clientY - prevPointer.y;
        targetWorldRotY += deltaX * 0.007;
        targetWorldRotX += deltaY * 0.007;
        prevPointer = { x: clientX, y: clientY };
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const onCanvasClick = () => {
      raycaster.setFromCamera(pointer, camera);
      const meshes = cardNodes.map(n => n.boxMesh);
      const intersects = raycaster.intersectObjects(meshes);
      if (intersects.length > 0) {
        const hit = cardNodes.find(n => n.boxMesh === intersects[0].object);
        if (hit && onSelectSkill) {
          onSelectSkill(hit.skill);
        }
      }
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('click', onCanvasClick);

    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || 700;
      height = container.clientHeight || 560;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // 9. Kinetic Render Loop
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      if (!isDragging) {
        targetWorldRotY += 0.0035;
        worldGroup.rotation.y = THREE.MathUtils.damp(worldGroup.rotation.y, targetWorldRotY, 4, delta);
        worldGroup.rotation.x = THREE.MathUtils.damp(worldGroup.rotation.x, targetWorldRotX, 4, delta);
      } else {
        worldGroup.rotation.y = THREE.MathUtils.damp(worldGroup.rotation.y, targetWorldRotY, 8, delta);
        worldGroup.rotation.x = THREE.MathUtils.damp(worldGroup.rotation.x, targetWorldRotX, 8, delta);
      }

      platformGroup.rotation.y = -elapsedTime * 0.2;

      raycaster.setFromCamera(pointer, camera);
      const meshes = cardNodes.map(n => n.boxMesh);
      const intersects = raycaster.intersectObjects(meshes);

      let hitItem: SkillCardNode | null = null;
      if (intersects.length > 0) {
        const match = cardNodes.find(n => n.boxMesh === intersects[0].object);
        if (match) {
          hitItem = match;
          if (!hoveredSkill || hoveredSkill.name !== match.skill.name) {
            setHoveredSkill(match.skill);
          }
        }
      }

      cardNodes.forEach(item => {
        const isHovered = (hitItem && hitItem.skill.name === item.skill.name) ||
                          (hoveredSkill?.name === item.skill.name);

        const targetScale = isHovered ? 1.25 : 1.0;
        item.group.scale.setScalar(
          THREE.MathUtils.damp(item.group.scale.x, targetScale, 8, delta)
        );

        item.group.position.x = THREE.MathUtils.damp(item.group.position.x, item.targetPos.x, 6, delta);
        item.group.position.y = THREE.MathUtils.damp(item.group.position.y, item.targetPos.y, 6, delta);
        item.group.position.z = THREE.MathUtils.damp(item.group.position.z, item.targetPos.z, 6, delta);

        item.group.rotation.x = THREE.MathUtils.damp(item.group.rotation.x, item.targetRot.x, 6, delta);
        item.group.rotation.y = THREE.MathUtils.damp(item.group.rotation.y, item.targetRot.y, 6, delta);
        item.group.rotation.z = THREE.MathUtils.damp(item.group.rotation.z, item.targetRot.z, 6, delta);

        const borderMat = item.borderMesh.material as THREE.LineBasicMaterial;
        borderMat.opacity = isHovered ? 1.0 : 0.8;
      });

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('click', onCanvasClick);

      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('resize', onResize);

      baseRingGeo.dispose();
      baseRingMat.dispose();
      ringNeonGeo.dispose();
      ringNeonMat.dispose();
      innerCoreGeo.dispose();
      innerCoreMat.dispose();

      cardNodes.forEach(n => {
        n.boxMesh.geometry.dispose();
        n.borderMesh.geometry.dispose();
        n.texture.dispose();
        if (Array.isArray(n.boxMesh.material)) {
          n.boxMesh.material.forEach(m => m.dispose());
        }
      });

      renderer.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, [activeSkills, layoutMode, hoveredSkill, setHoveredSkill, onSelectSkill]);

  return (
    <div className="relative w-full h-[480px] md:h-[560px] flex items-center justify-center select-none overflow-hidden rounded-3xl border border-purple-900/15 bg-white/70 backdrop-blur-md shadow-xl">
      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing ${
          isInteracting ? 'cursor-grabbing' : ''
        }`}
      />

      {/* Top 3D Shape Mode Switcher Tabs */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 p-1 rounded-xl bg-[#2e1065]/90 border border-purple-800 backdrop-blur-md shadow-md text-white">
        <button
          onClick={() => setLayoutMode('carousel')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-mono uppercase transition-all ${
            layoutMode === 'carousel'
              ? 'bg-violet-600 text-white shadow-sm'
              : 'text-purple-200 hover:text-white'
          }`}
          title="3D Curved Amphitheater Carousel"
        >
          <Disc3 className="w-3.5 h-3.5" />
          <span>Carousel</span>
        </button>

        <button
          onClick={() => setLayoutMode('tower')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-mono uppercase transition-all ${
            layoutMode === 'tower'
              ? 'bg-violet-600 text-white shadow-sm'
              : 'text-purple-200 hover:text-white'
          }`}
          title="3D Cyber Server Tower"
        >
          <Server className="w-3.5 h-3.5" />
          <span>Tower</span>
        </button>

        <button
          onClick={() => setLayoutMode('hex')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-mono uppercase transition-all ${
            layoutMode === 'hex'
              ? 'bg-violet-600 text-white shadow-sm'
              : 'text-purple-200 hover:text-white'
          }`}
          title="3D Honeycomb Matrix"
        >
          <Hexagon className="w-3.5 h-3.5" />
          <span>Honeycomb</span>
        </button>

        <button
          onClick={() => setLayoutMode('globe')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-mono uppercase transition-all ${
            layoutMode === 'globe'
              ? 'bg-violet-600 text-white shadow-sm'
              : 'text-purple-200 hover:text-white'
          }`}
          title="3D Spherical Orbit"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Globe</span>
        </button>
      </div>

      {/* Orbit Controls Guide Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#2e1065]/90 border border-purple-800 text-xs text-purple-200 pointer-events-none flex items-center gap-2 backdrop-blur-md shadow-md">
        <span className="w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_8px_#a855f7]" />
        <span className="font-mono text-[11px] font-medium text-purple-200">
          Drag to rotate 360° • Click or hover cards to inspect
        </span>
      </div>
    </div>
  );
};
