/**
 * Ishva AI — Interactive 3D Neural Agent Core & Ambient 3D Engine
 * Built with Three.js for real WebGL 3D rendering.
 * 
 * Features:
 * - 3D Geodesic Multi-Agent Supervisor Nucleus with dynamic undulating vertex wave
 * - Orbiting 3D Agent Satellites (Gemini Reasoning, Groq Coding, Visual Agent)
 * - Dynamic 3D Synapse lines with traveling light pulses
 * - Interactive 3D Quantum Particle Starfield with mouse parallax & inertia
 * - Full 360° click-and-drag orbit control
 * - Shockwave ripple burst on click
 * - 3 Visualization Modes: 'neural' (Core & Agents), 'network' (Constellation Mesh), 'vortex' (Quantum Warp)
 * - Reactive processing state: accelerates and pulses when Ishva is thinking/streaming
 */

import * as THREE from 'three';

class NeuralCore3D {
  constructor(containerId = 'hero3dContainer') {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.mode = 'neural'; // 'neural', 'network', 'vortex'
    this.isProcessing = false;
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.isDragging = false;
    this.prevMousePos = { x: 0, y: 0 };
    this.rotationVelocity = { x: 0.002, y: 0.003 };

    this.initScene();
    this.createCoreGeometry();
    this.createAgentSatellites();
    this.createSynapseLines();
    this.createParticleCloud();
    this.initEventListeners();
    this.animate();
  }

  initScene() {
    const width = this.container.clientWidth || 600;
    const height = this.container.clientHeight || 340;

    // 1. Scene & Camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.z = 26;

    // 2. WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;

    this.canvas = this.renderer.domElement;
    this.canvas.className = 'neural-core-canvas';
    this.container.appendChild(this.canvas);

    // 3. Ambient & Point Lighting
    this.ambientLight = new THREE.AmbientLight(0x1e1b4b, 1.8);
    this.scene.add(this.ambientLight);

    // Central core light (Supervisor Indigo/Purple)
    this.coreLight = new THREE.PointLight(0x818cf8, 4, 40);
    this.coreLight.position.set(0, 0, 0);
    this.scene.add(this.coreLight);

    // Reasoning light (Cyan)
    this.cyanLight = new THREE.PointLight(0x38bdf8, 3, 35);
    this.cyanLight.position.set(10, 8, 8);
    this.scene.add(this.cyanLight);

    // Coder light (Emerald)
    this.greenLight = new THREE.PointLight(0x10b981, 3, 35);
    this.greenLight.position.set(-10, -8, 6);
    this.scene.add(this.greenLight);

    // Main Group for interactive rotation
    this.worldGroup = new THREE.Group();
    this.scene.add(this.worldGroup);
  }

  createCoreGeometry() {
    this.coreGroup = new THREE.Group();

    // 1. Outer Geodesic Icosahedron Wireframe
    const outerGeo = new THREE.IcosahedronGeometry(4.6, 2);
    this.outerPositions = outerGeo.attributes.position.clone();
    
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
      emissive: 0x1e40af,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.9
    });
    this.outerMesh = new THREE.Mesh(outerGeo, outerMat);
    this.coreGroup.add(this.outerMesh);

    // 2. Inner Glowing Energy Core Sphere
    const innerGeo = new THREE.SphereGeometry(2.8, 32, 32);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      emissive: 0x4f46e5,
      emissiveIntensity: 1.2,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.85
    });
    this.innerSphere = new THREE.Mesh(innerGeo, innerMat);
    this.coreGroup.add(this.innerSphere);

    // 3. Central Quantum Ring (Orbital Torus)
    const torusGeo = new THREE.TorusGeometry(5.4, 0.08, 16, 100);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.7
    });
    this.ringX = new THREE.Mesh(torusGeo, torusMat);
    this.ringX.rotation.x = Math.PI / 2.5;
    this.coreGroup.add(this.ringX);

    const torusGeo2 = new THREE.TorusGeometry(5.8, 0.06, 16, 100);
    const torusMat2 = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.5
    });
    this.ringY = new THREE.Mesh(torusGeo2, torusMat2);
    this.ringY.rotation.y = Math.PI / 3;
    this.coreGroup.add(this.ringY);

    this.worldGroup.add(this.coreGroup);
  }

  createAgentSatellites() {
    this.satellites = [];
    
    // Agent definitions
    const agents = [
      {
        id: 'gemini',
        name: 'Reasoning (Gemini)',
        color: 0x38bdf8,
        emissive: 0x0284c7,
        radius: 8.8,
        speed: 0.022,
        inclination: 0.45,
        size: 0.95
      },
      {
        id: 'groq',
        name: 'Code (Groq LLaMA)',
        color: 0x10b981,
        emissive: 0x059669,
        radius: 10.5,
        speed: -0.018,
        inclination: -0.6,
        size: 0.88
      },
      {
        id: 'visual',
        name: 'Visual (Pollinations)',
        color: 0xf59e0b,
        emissive: 0xd97706,
        radius: 9.6,
        speed: 0.015,
        inclination: 1.1,
        size: 0.82
      },
      {
        id: 'security',
        name: 'QC & OWASP Guard',
        color: 0xa855f7,
        emissive: 0x7e22ce,
        radius: 11.8,
        speed: -0.012,
        inclination: -1.3,
        size: 0.78
      }
    ];

    agents.forEach((agent, i) => {
      const group = new THREE.Group();

      // Satellite Sphere
      const satGeo = new THREE.SphereGeometry(agent.size, 24, 24);
      const satMat = new THREE.MeshStandardMaterial({
        color: agent.color,
        emissive: agent.emissive,
        emissiveIntensity: 1.4,
        roughness: 0.1,
        metalness: 0.6
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      group.add(satMesh);

      // Satellite Glow Ring
      const ringGeo = new THREE.RingGeometry(agent.size * 1.3, agent.size * 1.5, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: agent.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
      });
      const glowRing = new THREE.Mesh(ringGeo, ringMat);
      glowRing.rotation.x = Math.PI / 2;
      group.add(glowRing);

      // Orbit trail
      const orbitGeo = new THREE.BufferGeometry();
      const orbitPoints = [];
      for (let theta = 0; theta <= Math.PI * 2; theta += 0.08) {
        const x = Math.cos(theta) * agent.radius;
        const z = Math.sin(theta) * agent.radius;
        const y = Math.sin(theta * 2) * (agent.radius * 0.2 * Math.sin(agent.inclination));
        orbitPoints.push(x, y, z);
      }
      orbitGeo.setAttribute('position', new THREE.Float32BufferAttribute(orbitPoints, 3));
      const orbitMat = new THREE.LineBasicMaterial({
        color: agent.color,
        transparent: true,
        opacity: 0.18
      });
      const orbitLine = new THREE.Line(orbitGeo, orbitMat);
      this.worldGroup.add(orbitLine);

      this.worldGroup.add(group);

      this.satellites.push({
        ...agent,
        group,
        mesh: satMesh,
        angle: (Math.PI * 2 / agents.length) * i
      });
    });
  }

  createSynapseLines() {
    this.synapses = [];
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
      linewidth: 1.5
    });

    this.satellites.forEach((sat) => {
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(6); // [0,0,0, sat.x, sat.y, sat.z]
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const line = new THREE.Line(geo, lineMat.clone());
      line.material.color.setHex(sat.color);
      this.worldGroup.add(line);

      // Pulse packet traveling along line
      const packetGeo = new THREE.SphereGeometry(0.2, 12, 12);
      const packetMat = new THREE.MeshBasicMaterial({
        color: sat.color,
        transparent: true,
        opacity: 0.9
      });
      const packet = new THREE.Mesh(packetGeo, packetMat);
      this.worldGroup.add(packet);

      this.synapses.push({
        line,
        packet,
        sat,
        progress: Math.random()
      });
    });
  }

  createParticleCloud() {
    const particleCount = 450;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color(0x38bdf8), // cyan
      new THREE.Color(0x6366f1), // indigo
      new THREE.Color(0xa855f7), // purple
      new THREE.Color(0x10b981)  // green
    ];

    for (let i = 0; i < particleCount; i++) {
      const radius = 6 + Math.random() * 22;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(geometry, material);
    this.worldGroup.add(this.particles);

    // Shockwave ripple ring (invisible until clicked)
    const rippleGeo = new THREE.RingGeometry(0.1, 0.4, 64);
    const rippleMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0
    });
    this.ripple = new THREE.Mesh(rippleGeo, rippleMat);
    this.worldGroup.add(this.ripple);
    this.rippleProgress = 1.0;
  }

  triggerShockwave() {
    this.rippleProgress = 0.0;
    this.ripple.scale.set(1, 1, 1);
    this.ripple.material.opacity = 0.9;
  }

  setMode(mode) {
    this.mode = mode;
    if (mode === 'vortex') {
      this.camera.position.z = 22;
    } else if (mode === 'network') {
      this.camera.position.z = 28;
    } else {
      this.camera.position.z = 26;
    }
  }

  setProcessingState(isProcessing) {
    this.isProcessing = isProcessing;
    if (isProcessing) {
      this.coreLight.intensity = 8;
      this.coreLight.color.setHex(0x38bdf8);
      this.triggerShockwave();
    } else {
      this.coreLight.intensity = 4;
      this.coreLight.color.setHex(0x818cf8);
    }
  }

  initEventListeners() {
    // Mouse Parallax & Drag
    window.addEventListener('mousemove', (e) => {
      const rect = this.container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      
      this.mouse.targetX = normX * 0.4;
      this.mouse.targetY = normY * 0.3;

      if (this.isDragging) {
        const deltaX = e.clientX - this.prevMousePos.x;
        const deltaY = e.clientY - this.prevMousePos.y;
        this.worldGroup.rotation.y += deltaX * 0.008;
        this.worldGroup.rotation.x += deltaY * 0.008;
        this.prevMousePos = { x: e.clientX, y: e.clientY };
      }
    });

    this.container.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.prevMousePos = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    // Shockwave click effect on canvas
    this.canvas.addEventListener('click', () => {
      this.triggerShockwave();
    });

    // Touch events for mobile
    this.container.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = this.container.getBoundingClientRect();
        this.mouse.targetX = (((touch.clientX - rect.left) / rect.width) * 2 - 1) * 0.4;
        this.mouse.targetY = (-(((touch.clientY - rect.top) / rect.height) * 2 - 1)) * 0.3;
      }
    }, { passive: true });

    // Window Resize handler
    window.addEventListener('resize', () => {
      if (!this.container) return;
      const width = this.container.clientWidth || 600;
      const height = this.container.clientHeight || 340;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const time = performance.now() * 0.001;
    const speedMultiplier = this.isProcessing ? 2.4 : 1.0;

    // 1. Smooth Mouse Parallax Interpolation
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    if (!this.isDragging) {
      this.worldGroup.rotation.y += 0.003 * speedMultiplier;
      this.worldGroup.rotation.x = this.mouse.y * 0.8;
      this.worldGroup.rotation.z = this.mouse.x * 0.4;
    }

    // 2. Vertex undulating animation on outer geodesic icosahedron
    if (this.outerMesh && this.outerPositions) {
      const positionAttr = this.outerMesh.geometry.attributes.position;
      const count = positionAttr.count;
      for (let i = 0; i < count; i++) {
        const origX = this.outerPositions.getX(i);
        const origY = this.outerPositions.getY(i);
        const origZ = this.outerPositions.getZ(i);

        const wave = Math.sin(time * 3 + origX * 0.8 + origY * 0.8) * 0.22 * speedMultiplier;
        positionAttr.setXYZ(
          i,
          origX + (origX * wave * 0.1),
          origY + (origY * wave * 0.1),
          origZ + (origZ * wave * 0.1)
        );
      }
      positionAttr.needsUpdate = true;
    }

    // 3. Inner sphere breathing glow & ring rotations
    if (this.innerSphere) {
      const breath = 1 + Math.sin(time * 2.5) * 0.06 * speedMultiplier;
      this.innerSphere.scale.set(breath, breath, breath);
    }
    if (this.ringX) this.ringX.rotation.z += 0.012 * speedMultiplier;
    if (this.ringY) this.ringY.rotation.x += 0.015 * speedMultiplier;

    // 4. Satellite orbits
    this.satellites.forEach((sat) => {
      sat.angle += sat.speed * speedMultiplier;
      const x = Math.cos(sat.angle) * sat.radius;
      const z = Math.sin(sat.angle) * sat.radius;
      const y = Math.sin(sat.angle * 2) * (sat.radius * 0.22 * Math.sin(sat.inclination));
      sat.group.position.set(x, y, z);
      sat.group.rotation.y += 0.02;
    });

    // 5. Update Synapses & traveling light pulses
    this.synapses.forEach((syn) => {
      const satPos = syn.sat.group.position;
      const linePos = syn.line.geometry.attributes.position;
      linePos.setXYZ(0, 0, 0, 0); // Core center
      linePos.setXYZ(1, satPos.x, satPos.y, satPos.z);
      linePos.needsUpdate = true;

      // Move packet along line
      syn.progress = (syn.progress + 0.018 * speedMultiplier) % 1.0;
      syn.packet.position.lerpVectors(new THREE.Vector3(0, 0, 0), satPos, syn.progress);
    });

    // 6. Particles Drift / Vortex
    if (this.particles) {
      if (this.mode === 'vortex') {
        this.particles.rotation.y += 0.02 * speedMultiplier;
        this.particles.rotation.z += 0.01 * speedMultiplier;
      } else {
        this.particles.rotation.y += 0.001 * speedMultiplier;
      }
    }

    // 7. Shockwave expansion
    if (this.rippleProgress < 1.0) {
      this.rippleProgress += 0.025;
      const scale = 1 + this.rippleProgress * 28;
      this.ripple.scale.set(scale, scale, 1);
      this.ripple.material.opacity = (1 - this.rippleProgress) * 0.8;
      this.ripple.lookAt(this.camera.position);
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// Full-screen ambient background 3D particle constellation
class AmbientBackground3D {
  constructor(canvasId = 'ambientBgCanvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.z = 100;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.createStarfield();
    this.initEvents();
    this.animate();
  }

  createStarfield() {
    const count = 300;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 400;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 400;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 300;

      // Soft deep cyber colors (blue/cyan/violet)
      colors[i * 3] = 0.2 + Math.random() * 0.2;
      colors[i * 3 + 1] = 0.6 + Math.random() * 0.3;
      colors[i * 3 + 2] = 0.9 + Math.random() * 0.1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });

    this.stars = new THREE.Points(geometry, material);
    this.scene.add(this.stars);
  }

  initEvents() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 15;
      this.mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 15;
    }, { passive: true });

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.03;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.03;

    if (this.stars) {
      this.stars.rotation.y += 0.0004;
      this.stars.rotation.x = this.mouse.y * 0.01;
      this.stars.position.x = -this.mouse.x * 0.8;
      this.stars.position.y = this.mouse.y * 0.8;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// Export singleton instances or initializers
let neuralCoreInstance = null;
let ambientBgInstance = null;

export function init3DExperience() {
  if (!neuralCoreInstance && document.getElementById('hero3dContainer')) {
    neuralCoreInstance = new NeuralCore3D('hero3dContainer');
  }
  if (!ambientBgInstance && document.getElementById('ambientBgCanvas')) {
    ambientBgInstance = new AmbientBackground3D('ambientBgCanvas');
  }
  return { neuralCore: neuralCoreInstance, ambientBg: ambientBgInstance };
}

export { NeuralCore3D, AmbientBackground3D };

export function getNeuralCore() {
  return neuralCoreInstance;
}
