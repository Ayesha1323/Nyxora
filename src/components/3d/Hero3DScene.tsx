import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { checkWebGLSupport } from '../../utils/webgl';

interface Hero3DSceneProps {
  theme?: 'dark' | 'light';
}

export const Hero3DScene: React.FC<Hero3DSceneProps> = ({ theme = 'dark' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglStatus, setWebglStatus] = useState<{ supported: boolean; isSoftwareGl: boolean }>({
    supported: true,
    isSoftwareGl: false
  });

  useEffect(() => {
    const support = checkWebGLSupport();
    setWebglStatus({
      supported: support.supported,
      isSoftwareGl: support.isSoftwareGl
    });

    if (!support.supported || !containerRef.current) return;

    const container = containerRef.current;
    let animId: number;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(theme === 'dark' ? 0x060913 : 0xf8fafc, 0.042);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // 2. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !support.isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(support.pixelRatio);
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = theme === 'dark' ? 1.3 : 1.1;

    container.appendChild(renderer.domElement);

    // 3. Three-Point Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, theme === 'dark' ? 0.7 : 1.4);
    scene.add(ambientLight);

    // Key Light
    const keyLight = new THREE.DirectionalLight(0xffffff, theme === 'dark' ? 2.8 : 2.2);
    keyLight.position.set(6, 8, 7);
    scene.add(keyLight);

    // Cool Rim Light
    const rimLight = new THREE.DirectionalLight(theme === 'dark' ? 0x06b6d4 : 0x0284c7, 3.2);
    rimLight.position.set(-6, -4, -4);
    scene.add(rimLight);

    // Warm / Violet Accent Light
    const violetLight = new THREE.PointLight(theme === 'dark' ? 0xa855f7 : 0x7c3aed, 3.5, 18);
    violetLight.position.set(4, -3, 3);
    scene.add(violetLight);

    // 4. Hero Composite Procedural Architecture (7 distinct parts)
    const heroMasterGroup = new THREE.Group();
    scene.add(heroMasterGroup);

    // Part 1: Primary Centerpiece - Faceted Crystalline Quantum Core
    const coreGeo = new THREE.DodecahedronGeometry(1.4, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0x0f172a : 0xf1f5f9,
      roughness: 0.15,
      metalness: 0.9,
      transparent: true,
      opacity: theme === 'dark' ? 0.88 : 0.82
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    heroMasterGroup.add(coreMesh);

    // Part 2: Emissive Geometric Chamfer Cage around the core
    const coreWireGeo = new THREE.DodecahedronGeometry(1.42, 0);
    const wireMat = new THREE.LineBasicMaterial({
      color: theme === 'dark' ? 0x22d3ee : 0x0284c7,
      transparent: true,
      opacity: theme === 'dark' ? 0.8 : 0.9
    });
    const coreWireMesh = new THREE.LineSegments(new THREE.EdgesGeometry(coreWireGeo), wireMat);
    heroMasterGroup.add(coreWireMesh);

    // Part 3: Inner Singularity (Radiant Energy Octahedron)
    const singularityGeo = new THREE.OctahedronGeometry(0.7, 0);
    const singularityMat = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0xa855f7 : 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: 0.85
    });
    const singularityMesh = new THREE.Mesh(singularityGeo, singularityMat);
    heroMasterGroup.add(singularityMesh);

    // Part 4: Gimbal Orbital Ring 1 (Latitude Ring with Tick Marks)
    const ring1Geo = new THREE.TorusGeometry(2.35, 0.025, 16, 90);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0x38bdf8 : 0x0284c7,
      metalness: 0.9,
      roughness: 0.2
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 8;
    heroMasterGroup.add(ring1);

    // Part 5: Gimbal Orbital Ring 2 (Inclined Longitude Ring)
    const ring2Geo = new THREE.TorusGeometry(2.7, 0.02, 16, 90);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0xc084fc : 0x9333ea,
      metalness: 0.9,
      roughness: 0.2
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 6;
    heroMasterGroup.add(ring2);

    // Part 6: Orbiting Tech Satellite Blades (4 Pylons with Laser Beacons)
    const pylonGroup = new THREE.Group();
    heroMasterGroup.add(pylonGroup);

    const pylons: THREE.Mesh[] = [];
    const pylonGeo = new THREE.BoxGeometry(0.2, 0.65, 0.08);
    const pylonMat = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0x1e293b : 0xe2e8f0,
      metalness: 0.85,
      roughness: 0.2
    });

    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const dist = 2.45;
      const pylon = new THREE.Mesh(pylonGeo, pylonMat);
      pylon.position.set(Math.cos(angle) * dist, 0, Math.sin(angle) * dist);
      pylon.rotation.y = -angle + Math.PI / 2;

      // Add miniature laser light tip to each pylon
      const tipGeo = new THREE.SphereGeometry(0.04, 8, 8);
      const tipMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? (theme === 'dark' ? 0x22d3ee : 0x0284c7) : (theme === 'dark' ? 0xa855f7 : 0x7c3aed)
      });
      const tip = new THREE.Mesh(tipGeo, tipMat);
      tip.position.y = 0.35;
      pylon.add(tip);

      pylonGroup.add(pylon);
      pylons.push(pylon);
    }

    // Part 7: Ambient Cyber Data Particle Field
    const particleCount = support.isSoftwareGl ? 120 : 450;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cCyan = new THREE.Color(theme === 'dark' ? 0x06b6d4 : 0x0284c7);
    const cViolet = new THREE.Color(theme === 'dark' ? 0x8b5cf6 : 0x7c3aed);
    const cSky = new THREE.Color(theme === 'dark' ? 0x38bdf8 : 0x2563eb);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 16;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 9;

      const clr = i % 3 === 0 ? cCyan : i % 3 === 1 ? cViolet : cSky;
      particleColors[i3] = clr.r;
      particleColors[i3 + 1] = clr.g;
      particleColors[i3 + 2] = clr.b;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    // Circle texture
    const dotCanvas = document.createElement('canvas');
    dotCanvas.width = 64;
    dotCanvas.height = 64;
    const dotCtx = dotCanvas.getContext('2d');
    if (dotCtx) {
      const grad = dotCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      if (theme === 'dark') {
        grad.addColorStop(0, 'rgba(255,255,255,1)');
        grad.addColorStop(0.3, 'rgba(34,211,238,0.85)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
      } else {
        grad.addColorStop(0, 'rgba(2,132,199,1)');
        grad.addColorStop(0.4, 'rgba(124,58,237,0.7)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
      }
      dotCtx.fillStyle = grad;
      dotCtx.fillRect(0, 0, 64, 64);
    }
    const dotTexture = new THREE.CanvasTexture(dotCanvas);

    const particlesMat = new THREE.PointsMaterial({
      size: theme === 'dark' ? 0.12 : 0.14,
      map: dotTexture,
      transparent: true,
      vertexColors: true,
      blending: theme === 'dark' ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    // 5. Mouse Interaction Tracking
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      mouse.targetX = (clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // 6. Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 7. Kinetic Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow with exponential damping
      mouse.x = THREE.MathUtils.damp(mouse.x, mouse.targetX, 4, delta);
      mouse.y = THREE.MathUtils.damp(mouse.y, mouse.targetY, 4, delta);

      // Hero Master Group spatial posture
      heroMasterGroup.rotation.y = elapsedTime * 0.18 + mouse.x * 0.45;
      heroMasterGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.15 + mouse.y * 0.35;
      heroMasterGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.12;

      // Inner Core Counter-Rotation
      coreMesh.rotation.y = -elapsedTime * 0.25;
      coreMesh.rotation.x = elapsedTime * 0.15;
      coreWireMesh.rotation.y = -elapsedTime * 0.25;
      coreWireMesh.rotation.x = elapsedTime * 0.15;

      // Singularity pulse
      const pulse = 1.0 + Math.sin(elapsedTime * 3) * 0.08;
      singularityMesh.scale.set(pulse, pulse, pulse);
      singularityMesh.rotation.y = elapsedTime * 0.6;
      singularityMesh.rotation.z = -elapsedTime * 0.4;

      // Gimbal Rings
      ring1.rotation.z = elapsedTime * 0.22;
      ring2.rotation.z = -elapsedTime * 0.18;

      // Satellite Pylons orbit
      pylonGroup.rotation.y = elapsedTime * 0.28;
      pylonGroup.rotation.x = Math.sin(elapsedTime * 0.3) * 0.1;

      // Particles subtle drift
      particles.rotation.y = elapsedTime * 0.03 + mouse.x * 0.1;
      particles.rotation.x = mouse.y * 0.08;

      // Dynamic light movements
      violetLight.position.x = Math.cos(elapsedTime * 0.6) * 4;
      violetLight.position.y = Math.sin(elapsedTime * 0.5) * 4;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      coreGeo.dispose();
      coreMat.dispose();
      coreWireGeo.dispose();
      wireMat.dispose();
      singularityGeo.dispose();
      singularityMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      pylonGeo.dispose();
      pylonMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      dotTexture.dispose();
      renderer.dispose();

      if (renderer.domElement && renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, [theme]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-auto" />

      {/* Fallback ambient glow layers if WebGL disabled */}
      {!webglStatus.supported && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-cyan-900/20 dark:via-slate-950 dark:to-slate-950 from-cyan-200/30 via-slate-100 to-slate-100 animate-pulse" />
      )}

      {/* Top and bottom subtle fade to content */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b dark:from-slate-950/80 from-slate-50/90 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t dark:from-slate-950 from-slate-50 to-transparent pointer-events-none" />
    </div>
  );
};
