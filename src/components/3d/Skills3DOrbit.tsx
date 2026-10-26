import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { ALL_SKILLS, SKILL_CATEGORIES } from '../../data/portfolioData';
import { checkWebGLSupport } from '../../utils/webgl';
import { SkillItem } from '../../types/portfolio';

interface Skills3DOrbitProps {
  theme?: 'dark' | 'light';
  selectedCategory: string;
  onSelectSkill?: (skill: SkillItem | null) => void;
  hoveredSkill: SkillItem | null;
  setHoveredSkill: (skill: SkillItem | null) => void;
}

export const Skills3DOrbit: React.FC<Skills3DOrbitProps> = ({
  theme = 'dark',
  selectedCategory,
  onSelectSkill,
  hoveredSkill,
  setHoveredSkill
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
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
    let width = container.clientWidth || 600;
    let height = container.clientHeight || 500;
    let animId: number;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 7.5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !support.isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(support.pixelRatio);
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Group holding the entire rotating system
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    // Central wireframe energy core
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x8b5cf6 : 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: theme === 'dark' ? 0.25 : 0.35
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    sphereGroup.add(coreMesh);

    // Inner glowing ring
    const ringGeo = new THREE.TorusGeometry(2.3, 0.02, 16, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x06b6d4 : 0x0284c7,
      transparent: true,
      opacity: theme === 'dark' ? 0.35 : 0.45
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    sphereGroup.add(ring1);

    // Generate 3D Text / Sprite Nodes on a Fibonacci Sphere
    const nodesCount = activeSkills.length;
    const radius = 3.2;
    const nodeMeshes: {
      sprite: THREE.Sprite;
      skill: SkillItem;
      originalScale: [number, number, number];
      position: THREE.Vector3;
    }[] = [];

    // Helper to draw text onto a 2D canvas texture with theme awareness
    const createSkillSprite = (skill: SkillItem, isHighlighted: boolean) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 384;
      canvas.height = 128;

      if (ctx) {
        const cat = SKILL_CATEGORIES.find(c => c.name === skill.category);
        const accentHex = cat ? cat.color : '#06b6d4';

        // Background pill
        ctx.beginPath();
        const r = 36;
        const x = 12;
        const y = 12;
        const w = canvas.width - 24;
        const h = canvas.height - 24;

        if (theme === 'dark') {
          ctx.fillStyle = isHighlighted ? 'rgba(15, 23, 42, 0.95)' : 'rgba(10, 15, 30, 0.82)';
        } else {
          ctx.fillStyle = isHighlighted ? 'rgba(255, 255, 255, 0.98)' : 'rgba(241, 245, 249, 0.95)';
        }
        ctx.roundRect(x, y, w, h, r);
        ctx.fill();

        // Border glow
        ctx.lineWidth = isHighlighted ? 6 : 3;
        ctx.strokeStyle = isHighlighted ? (theme === 'dark' ? '#38bdf8' : '#0284c7') : accentHex;
        ctx.stroke();

        // Inner indicator dot
        ctx.beginPath();
        ctx.arc(60, 64, 14, 0, Math.PI * 2);
        ctx.fillStyle = accentHex;
        ctx.fill();

        // Skill Name Text - High Contrast in both modes
        ctx.font = 'bold 36px "Space Grotesk", sans-serif';
        ctx.fillStyle = theme === 'dark' ? '#ffffff' : '#0f172a';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(skill.name, 90, 52);

        // Subtitle / category
        ctx.font = '600 24px "Inter", sans-serif';
        if (theme === 'dark') {
          ctx.fillStyle = isHighlighted ? '#a5f3fc' : 'rgba(203, 213, 225, 0.85)';
        } else {
          ctx.fillStyle = isHighlighted ? '#0369a1' : 'rgba(51, 65, 85, 0.88)';
        }
        ctx.fillText(`${skill.category} • ${skill.level}%`, 90, 88);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;

      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthWrite: false
      });

      const sprite = new THREE.Sprite(material);
      const scaleX = 1.35;
      const scaleY = 0.45;
      sprite.scale.set(scaleX, scaleY, 1);
      return { sprite, scale: [scaleX, scaleY, 1] as [number, number, number] };
    };

    // Distribute skills evenly on sphere surface using Fibonacci spiral
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    activeSkills.forEach((skill, i) => {
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / nodesCount);

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      const isCurrentHovered = hoveredSkill?.name === skill.name;
      const { sprite, scale } = createSkillSprite(skill, isCurrentHovered);
      sprite.position.set(x, y, z);

      sphereGroup.add(sprite);
      nodeMeshes.push({
        sprite,
        skill,
        originalScale: scale,
        position: new THREE.Vector3(x, y, z)
      });
    });

    // Raycaster for hovering sprites
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let targetRotationX = 0;
    let targetRotationY = 0;
    let rotationVelocityX = 0.003;
    let rotationVelocityY = 0.004;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsInteracting(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMousePos = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      pointer.x = ((clientX - rect.left) / width) * 2 - 1;
      pointer.y = -((clientY - rect.top) / height) * 2 + 1;

      if (isDragging) {
        const deltaX = clientX - prevMousePos.x;
        const deltaY = clientY - prevMousePos.y;
        targetRotationY += deltaX * 0.007;
        targetRotationX += deltaY * 0.007;
        prevMousePos = { x: clientX, y: clientY };
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const handleCanvasClick = () => {
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes.map(n => n.sprite));
      if (intersects.length > 0) {
        const clickedSprite = intersects[0].object as THREE.Sprite;
        const item = nodeMeshes.find(n => n.sprite === clickedSprite);
        if (item && onSelectSkill) {
          onSelectSkill(item.skill);
        }
      }
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('click', handleCanvasClick);

    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || 600;
      height = container.clientHeight || 500;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      if (!isDragging) {
        sphereGroup.rotation.y += rotationVelocityY;
        sphereGroup.rotation.x += rotationVelocityX * 0.5;
      } else {
        sphereGroup.rotation.y = THREE.MathUtils.damp(sphereGroup.rotation.y, targetRotationY, 8, delta);
        sphereGroup.rotation.x = THREE.MathUtils.damp(sphereGroup.rotation.x, targetRotationX, 8, delta);
      }

      coreMesh.rotation.y = -elapsedTime * 0.3;
      ring1.rotation.z = elapsedTime * 0.2;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes.map(n => n.sprite));

      if (intersects.length > 0) {
        const hoveredSprite = intersects[0].object as THREE.Sprite;
        const hit = nodeMeshes.find(n => n.sprite === hoveredSprite);
        if (hit && (!hoveredSkill || hoveredSkill.name !== hit.skill.name)) {
          setHoveredSkill(hit.skill);
        }
      }

      nodeMeshes.forEach(node => {
        const worldPos = node.sprite.getWorldPosition(new THREE.Vector3());
        const distance = camera.position.distanceTo(worldPos);
        const isHovered = hoveredSkill?.name === node.skill.name;

        const scaleFactor = THREE.MathUtils.clamp((8.5 - distance) * 0.28, 0.55, 1.45);
        const hoverMultiplier = isHovered ? 1.35 : 1.0;

        node.sprite.scale.set(
          node.originalScale[0] * scaleFactor * hoverMultiplier,
          node.originalScale[1] * scaleFactor * hoverMultiplier,
          1
        );
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
      container.removeEventListener('click', handleCanvasClick);

      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('resize', onResize);

      coreGeo.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();

      nodeMeshes.forEach(n => {
        n.sprite.material.map?.dispose();
        n.sprite.material.dispose();
      });

      renderer.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, [activeSkills, selectedCategory, hoveredSkill, setHoveredSkill, onSelectSkill, theme]);

  return (
    <div className="relative w-full h-[460px] md:h-[540px] flex items-center justify-center select-none overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-950/60 backdrop-blur-xl shadow-lg shadow-slate-200/50 dark:shadow-none">
      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing ${
          isInteracting ? 'cursor-grabbing' : ''
        }`}
      />

      {/* Orbit Controls Guide Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 text-xs text-slate-700 dark:text-slate-400 pointer-events-none flex items-center gap-2 backdrop-blur-md shadow-sm">
        <span className="w-2 h-2 rounded-full bg-cyan-500" />
        <span className="font-medium">Click & drag to rotate 3D tag sphere • Hover tags to inspect</span>
      </div>

      {/* Background radial gradient glow */}
      <div className="absolute inset-0 bg-radial from-cyan-500/5 via-violet-500/5 to-transparent pointer-events-none" />
    </div>
  );
};
