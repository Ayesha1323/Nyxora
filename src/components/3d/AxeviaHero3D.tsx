import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { checkWebGLSupport } from '../../utils/webgl';
import { Sparkles, Tv, Globe, Orbit, RefreshCw } from 'lucide-react';

interface AxeviaHero3DProps {
  theme?: 'dark' | 'light';
}

export type AxeviaHeroMode = 'particles' | 'crt' | 'globe' | 'orbit';

export const AxeviaHero3D: React.FC<AxeviaHero3DProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<AxeviaHeroMode>('particles');
  const [avatarIndex, setAvatarIndex] = useState(0);

  useEffect(() => {
    const support = checkWebGLSupport();
    if (!support.supported || !containerRef.current) return;

    const container = containerRef.current;
    let animId: number;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera Setup - Fog blends seamlessly into cream white background
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xfdfbf7, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.0);

    // 2. Renderer with transparent background
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
    renderer.toneMappingExposure = 1.15;

    container.appendChild(renderer.domElement);

    // 3. Lighting Rig - Deep Purple, Amethyst & Warm Fill
    const ambientLight = new THREE.AmbientLight(0xfff8f0, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight.position.set(6, 8, 7);
    scene.add(dirLight);

    const purpleLight = new THREE.PointLight(0x581c87, 5.0, 22);
    purpleLight.position.set(-4, 3, 3);
    scene.add(purpleLight);

    const violetLight = new THREE.PointLight(0x9333ea, 4.5, 22);
    violetLight.position.set(4, -3, 3);
    scene.add(violetLight);

    // Master Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Mouse Tracking for Interactive Particle Scattering
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      worldPos: new THREE.Vector3(0, 0, 0)
    };

    // ==========================================
    // MODE 1 & 4: PARTICLES & ORBIT (DARK PURPLE & AMETHYST ON CREAM)
    // ==========================================
    const particlesGroup = new THREE.Group();
    masterGroup.add(particlesGroup);

    const pCount = support.isSoftwareGl ? 400 : 950;
    const originPositions = new Float32Array(pCount * 3);
    const currentPositions = new Float32Array(pCount * 3);
    const velocities = new Float32Array(pCount * 3);
    const particleColors = new Float32Array(pCount * 3);

    const colDarkPurple = new THREE.Color(0x2e1065);
    const colRoyalPurple = new THREE.Color(0x581c87);
    const colViolet = new THREE.Color(0x7c3aed);
    const colAmethyst = new THREE.Color(0xa855f7);

    // Generate portrait silhouette & geometric matrix coordinates
    const generateTargetPoints = (avatarMode: number) => {
      for (let i = 0; i < pCount; i++) {
        const i3 = i * 3;
        let ox = 0, oy = 0, oz = 0;

        if (avatarMode === 0) {
          // Silhouette 1: Developer Monogram Portal with Diamond Halo
          if (i < pCount * 0.45) {
            const angle = (i / (pCount * 0.45)) * Math.PI * 4;
            const r = 1.35 + Math.sin(i * 0.4) * 0.35;
            ox = Math.cos(angle) * r;
            oy = Math.sin(angle) * r;
            oz = (Math.random() - 0.5) * 0.5;
          } else if (i < pCount * 0.75) {
            const angle = ((i - pCount * 0.45) / (pCount * 0.3)) * Math.PI * 2;
            const r = 2.45 + (i % 3) * 0.2;
            ox = Math.cos(angle) * r;
            oy = Math.sin(angle) * r * 0.85;
            oz = (Math.random() - 0.5) * 1.2;
          } else {
            ox = (Math.random() - 0.5) * 10;
            oy = (Math.random() - 0.5) * 7.5;
            oz = (Math.random() - 0.5) * 5;
          }
        } else {
          // Silhouette 2: Dual Helix & Crystalline Core Matrix
          const strand = i % 2;
          const u = i / pCount;
          const angle = u * Math.PI * 8;
          const r = 1.8 + Math.sin(u * 20) * 0.2;
          ox = Math.cos(angle + (strand * Math.PI)) * r;
          oy = (u - 0.5) * 5.2;
          oz = Math.sin(angle + (strand * Math.PI)) * r;
        }

        originPositions[i3] = ox;
        originPositions[i3 + 1] = oy;
        originPositions[i3 + 2] = oz;

        if (currentPositions[i3] === 0 && currentPositions[i3 + 1] === 0) {
          currentPositions[i3] = ox;
          currentPositions[i3 + 1] = oy;
          currentPositions[i3 + 2] = oz;
        }

        const clr = i % 4 === 0 ? colDarkPurple : i % 4 === 1 ? colRoyalPurple : i % 4 === 2 ? colViolet : colAmethyst;
        particleColors[i3] = clr.r;
        particleColors[i3 + 1] = clr.g;
        particleColors[i3 + 2] = clr.b;
      }
    };

    generateTargetPoints(avatarIndex);

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    // Particle sprite texture - High contrast dark purple & violet
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      const grad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(46,16,101,1)');
      grad.addColorStop(0.4, 'rgba(88,28,135,0.95)');
      grad.addColorStop(0.7, 'rgba(124,58,237,0.5)');
      grad.addColorStop(1, 'rgba(46,16,101,0)');
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 64, 64);
    }
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const pMat = new THREE.PointsMaterial({
      size: 0.16,
      map: pTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.NormalBlending,
      depthWrite: false
    });

    const particleSystem = new THREE.Points(pGeo, pMat);
    particlesGroup.add(particleSystem);

    // Central Crystalline Wireframe Core (Dark purple body with violet edges)
    const glassGeo = new THREE.IcosahedronGeometry(1.15, 0);
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x2e1065,
      roughness: 0.3,
      metalness: 0.8,
      transparent: true,
      opacity: 0.85
    });
    const glassCore = new THREE.Mesh(glassGeo, glassMat);
    particlesGroup.add(glassCore);

    const glassEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(glassGeo),
      new THREE.LineBasicMaterial({
        color: 0x7c3aed,
        linewidth: 2,
        transparent: true,
        opacity: 0.95
      })
    );
    particlesGroup.add(glassEdges);

    // ==========================================
    // MODE 2: CRT GLITCH SHADER PORTRAIT
    // ==========================================
    const crtGroup = new THREE.Group();
    masterGroup.add(crtGroup);

    const crtCanvas = document.createElement('canvas');
    crtCanvas.width = 512;
    crtCanvas.height = 512;
    const crtCtx = crtCanvas.getContext('2d');
    if (crtCtx) {
      crtCtx.fillStyle = '#240733';
      crtCtx.fillRect(0, 0, 512, 512);

      // CRT Scanlines in Violet
      crtCtx.fillStyle = 'rgba(168, 85, 247, 0.15)';
      for (let y = 0; y < 512; y += 4) {
        crtCtx.fillRect(0, y, 512, 1.5);
      }

      // Digital Glitch Bezel
      crtCtx.strokeStyle = '#7c3aed';
      crtCtx.lineWidth = 5;
      crtCtx.strokeRect(32, 32, 448, 448);

      // Targeting Crosshairs
      crtCtx.lineWidth = 1.5;
      crtCtx.strokeStyle = 'rgba(192, 132, 252, 0.4)';
      crtCtx.beginPath();
      crtCtx.moveTo(256, 36);
      crtCtx.lineTo(256, 476);
      crtCtx.moveTo(36, 256);
      crtCtx.lineTo(476, 256);
      crtCtx.stroke();

      // Bold Typography
      crtCtx.font = 'bold 88px "Space Grotesk", sans-serif';
      crtCtx.fillStyle = '#faf8f5';
      crtCtx.textAlign = 'center';
      crtCtx.textBaseline = 'middle';
      crtCtx.fillText('AS.DEV', 256, 215);

      crtCtx.font = 'bold 24px "JetBrains Mono", monospace';
      crtCtx.fillStyle = '#d8b4fe';
      crtCtx.fillText('AYESHA SAHANI // FULL STACK', 256, 290);

      crtCtx.font = 'bold 16px "JetBrains Mono", monospace';
      crtCtx.fillStyle = '#a855f7';
      crtCtx.fillText('REACT • NODE.JS • POSTGRESQL • AWS', 256, 335);
    }
    const crtTexture = new THREE.CanvasTexture(crtCanvas);

    const crtPlaneGeo = new THREE.PlaneGeometry(3.6, 3.6);
    const crtPlaneMat = new THREE.MeshBasicMaterial({
      map: crtTexture,
      transparent: true,
      side: THREE.DoubleSide
    });
    const crtMesh = new THREE.Mesh(crtPlaneGeo, crtPlaneMat);
    crtGroup.add(crtMesh);

    const frameGeo = new THREE.BoxGeometry(3.9, 3.9, 0.12);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x1e082b,
      metalness: 0.9,
      roughness: 0.2
    });
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    frameMesh.position.z = -0.07;
    crtGroup.add(frameMesh);

    const bracketGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(4.2, 4.2, 0.05));
    const bracketMat = new THREE.LineBasicMaterial({
      color: 0x7c3aed
    });
    const bracketMesh = new THREE.LineSegments(bracketGeo, bracketMat);
    crtGroup.add(bracketMesh);

    // ==========================================
    // MODE 3: 3D TYPOGRAPHY GLOBE (DARK PURPLE & AMETHYST)
    // ==========================================
    const globeGroup = new THREE.Group();
    masterGroup.add(globeGroup);

    const globeWords = [
      'REACT.JS', 'NODE.JS', 'POSTGRESQL', 'TYPESCRIPT',
      'AWS EC2', 'CLOUDFLARE', 'GEMINI API', 'FULL STACK',
      'EXPRESS', 'REST APIS', 'DOCKER', 'CYBERSECURITY',
      'PYTHON', 'DATA SCIENCE', 'TAILWIND', 'VITE'
    ];

    const globeRadius = 2.75;
    globeWords.forEach((word, idx) => {
      const wCanvas = document.createElement('canvas');
      wCanvas.width = 384;
      wCanvas.height = 100;
      const wCtx = wCanvas.getContext('2d');
      if (wCtx) {
        wCtx.fillStyle = '#2e1065';
        wCtx.roundRect(8, 8, 368, 84, 24);
        wCtx.fill();

        wCtx.lineWidth = 3;
        wCtx.strokeStyle = idx % 2 === 0 ? '#7c3aed' : '#a855f7';
        wCtx.roundRect(8, 8, 368, 84, 24);
        wCtx.stroke();

        wCtx.beginPath();
        wCtx.arc(42, 50, 8, 0, Math.PI * 2);
        wCtx.fillStyle = idx % 2 === 0 ? '#7c3aed' : '#a855f7';
        wCtx.fill();

        wCtx.font = 'bold 36px "Space Grotesk", sans-serif';
        wCtx.fillStyle = '#faf8f5';
        wCtx.textAlign = 'left';
        wCtx.textBaseline = 'middle';
        wCtx.fillText(word, 68, 50);
      }

      const wTex = new THREE.CanvasTexture(wCanvas);
      wTex.colorSpace = THREE.SRGBColorSpace;

      const spriteMat = new THREE.SpriteMaterial({
        map: wTex,
        transparent: true,
        depthWrite: false
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(1.4, 0.38, 1);

      const phi = Math.acos(-1 + (2 * idx) / globeWords.length);
      const theta = Math.sqrt(globeWords.length * Math.PI) * phi;

      sprite.position.set(
        globeRadius * Math.cos(theta) * Math.sin(phi),
        globeRadius * Math.sin(theta) * Math.sin(phi),
        globeRadius * Math.cos(phi)
      );

      globeGroup.add(sprite);
    });

    const globeWire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.35, 1),
      new THREE.MeshBasicMaterial({
        color: 0x581c87,
        wireframe: true,
        transparent: true,
        opacity: 0.25
      })
    );
    globeGroup.add(globeWire);

    // Visibility toggling
    const updateVisibility = (mode: AxeviaHeroMode) => {
      particlesGroup.visible = mode === 'particles' || mode === 'orbit';
      crtGroup.visible = mode === 'crt';
      globeGroup.visible = mode === 'globe';
    };
    updateVisibility(activeMode);

    // Pointer Interaction
    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0, clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      mouse.targetX = (clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(clientY / window.innerHeight) * 2 + 1;

      // Project into 3D world plane for particle scattering
      const vector = new THREE.Vector3(mouse.targetX, mouse.targetY, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      mouse.worldPos.copy(camera.position).add(dir.multiplyScalar(distance));
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });

    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // Kinetic Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      mouse.x = THREE.MathUtils.damp(mouse.x, mouse.targetX, 4, delta);
      mouse.y = THREE.MathUtils.damp(mouse.y, mouse.targetY, 4, delta);

      masterGroup.rotation.y = mouse.x * 0.35;
      masterGroup.rotation.x = mouse.y * 0.25;

      if (activeMode === 'particles' || activeMode === 'orbit') {
        const positions = pGeo.attributes.position.array as Float32Array;

        for (let i = 0; i < pCount; i++) {
          const i3 = i * 3;
          let ox = originPositions[i3];
          let oy = originPositions[i3 + 1];
          let oz = originPositions[i3 + 2];

          // In Orbit mode, add wave dispersal rhythm
          if (activeMode === 'orbit') {
            const wave = Math.sin(elapsed * 2 + i * 0.1) * 0.35;
            ox += wave * 0.3;
            oz += Math.cos(elapsed * 1.5 + i * 0.1) * 0.3;
          }

          let cx = positions[i3];
          let cy = positions[i3 + 1];
          let cz = positions[i3 + 2];

          // Distance to cursor
          const dx = cx - mouse.worldPos.x;
          const dy = cy - mouse.worldPos.y;
          const distSq = dx * dx + dy * dy;
          const repelDist = 2.2;

          if (distSq < repelDist * repelDist) {
            const dist = Math.sqrt(distSq) || 0.001;
            const force = (1 - dist / repelDist) * 0.28;
            velocities[i3] += (dx / dist) * force;
            velocities[i3 + 1] += (dy / dist) * force;
            velocities[i3 + 2] += (Math.random() - 0.5) * 0.1;
          }

          // Elastic spring back
          const springK = 0.058;
          velocities[i3] += (ox - cx) * springK;
          velocities[i3 + 1] += (oy - cy) * springK;
          velocities[i3 + 2] += (oz - cz) * springK;

          velocities[i3] *= 0.88;
          velocities[i3 + 1] *= 0.88;
          velocities[i3 + 2] *= 0.88;

          positions[i3] += velocities[i3];
          positions[i3 + 1] += velocities[i3 + 1];
          positions[i3 + 2] += velocities[i3 + 2];
        }

        pGeo.attributes.position.needsUpdate = true;
        particleSystem.rotation.y = elapsed * 0.06;
        glassCore.rotation.y = -elapsed * 0.25;
        glassCore.rotation.x = elapsed * 0.15;
        glassEdges.rotation.y = -elapsed * 0.25;
        glassEdges.rotation.x = elapsed * 0.15;
      } else if (activeMode === 'crt') {
        crtGroup.rotation.y = Math.sin(elapsed * 0.8) * 0.12 + mouse.x * 0.3;
        crtGroup.rotation.x = Math.cos(elapsed * 0.7) * 0.08 + mouse.y * 0.2;
        crtGroup.position.y = Math.sin(elapsed * 1.2) * 0.08;
      } else if (activeMode === 'globe') {
        globeGroup.rotation.y = elapsed * 0.2 + mouse.x * 0.3;
        globeGroup.rotation.x = Math.sin(elapsed * 0.15) * 0.15 + mouse.y * 0.2;
        globeWire.rotation.y = -elapsed * 0.1;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('resize', onResize);

      pGeo.dispose();
      pMat.dispose();
      pTexture.dispose();
      glassGeo.dispose();
      glassMat.dispose();
      glassEdges.geometry.dispose();

      crtCanvas.remove();
      crtTexture.dispose();
      crtPlaneGeo.dispose();
      crtPlaneMat.dispose();
      frameGeo.dispose();
      frameMat.dispose();
      bracketGeo.dispose();
      bracketMat.dispose();

      renderer.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, [activeMode, avatarIndex]);

  const switchAvatar = () => {
    setAvatarIndex(prev => (prev === 0 ? 1 : 0));
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* WebGL Canvas */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-auto" />

      {/* Floating Design Mode Switcher Dock */}
      <div className="absolute top-20 sm:top-24 right-4 sm:right-8 z-30 pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#2e1065]/90 border border-purple-800/80 backdrop-blur-md shadow-xl text-white">
        <button
          onClick={() => setActiveMode('particles')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
            activeMode === 'particles'
              ? 'bg-violet-600 text-white shadow-sm'
              : 'text-purple-200 hover:text-white'
          }`}
          title="Interactive Image Particles (scatter & spring)"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Particles</span>
        </button>

        <button
          onClick={() => setActiveMode('orbit')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
            activeMode === 'orbit'
              ? 'bg-violet-600 text-white shadow-sm'
              : 'text-purple-200 hover:text-white'
          }`}
          title="Orbit Point-Cloud Loop"
        >
          <Orbit className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Orbit</span>
        </button>

        <button
          onClick={() => setActiveMode('crt')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
            activeMode === 'crt'
              ? 'bg-violet-600 text-white shadow-sm'
              : 'text-purple-200 hover:text-white'
          }`}
          title="CRT Glitch Shader Portrait"
        >
          <Tv className="w-3.5 h-3.5" />
          <span className="hidden md:inline">CRT Shader</span>
        </button>

        <button
          onClick={() => setActiveMode('globe')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
            activeMode === 'globe'
              ? 'bg-violet-600 text-white shadow-sm'
              : 'text-purple-200 hover:text-white'
          }`}
          title="3D Rotating Typography Globe"
        >
          <Globe className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Word Globe</span>
        </button>

        {activeMode === 'particles' && (
          <button
            onClick={switchAvatar}
            className="p-1.5 rounded-xl bg-purple-900/80 text-violet-300 hover:bg-purple-800 transition-colors border border-purple-700"
            title="Morph particle silhouette"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Top and Bottom Fade Vignettes - Seamless cream canvas transitions */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#fdfbf7] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#fdfbf7] to-transparent pointer-events-none" />
    </div>
  );
};
