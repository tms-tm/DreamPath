'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export interface DreamyMascotProps {
  mood?: 'idle' | 'listening' | 'happy' | 'thinking' | 'surprised';
  isDragging?: boolean;
  isWaving?: boolean;
  tiltDeg?: number;
  triggerEntrance?: number;
  onTap?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function DreamyMascot({
  mood = 'idle',
  isDragging = false,
  isWaving = false,
  tiltDeg = 0,
  triggerEntrance = 0,
  onTap,
  className = '',
  size = 'md',
}: DreamyMascotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasWebGlError, setHasWebGlError] = useState(false);

  // Store active animation flags in refs for 60fps frame-rate-independent loops without React re-renders
  const moodRef = useRef(mood);
  const isDraggingRef = useRef(isDragging);
  const isWavingRef = useRef(isWaving);
  const tiltDegRef = useRef(tiltDeg);
  const triggerEntranceRef = useRef(triggerEntrance);
  const restartEntranceSpinRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    moodRef.current = mood;
  }, [mood]);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  useEffect(() => {
    isWavingRef.current = isWaving;
  }, [isWaving]);

  useEffect(() => {
    tiltDegRef.current = tiltDeg;
  }, [tiltDeg]);

  useEffect(() => {
    if (triggerEntrance !== triggerEntranceRef.current) {
      triggerEntranceRef.current = triggerEntrance;
      restartEntranceSpinRef.current?.();
    }
  }, [triggerEntrance]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    let blinkTimer: NodeJS.Timeout;
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;

    try {
      // ---------------------------------------------------------------- renderer, camera, light
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.08;

      scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environmentIntensity = 0.55;

      camera = new THREE.PerspectiveCamera(26, 1, 0.1, 50);
      camera.position.set(0.14, 2.02, 8.5);
      camera.lookAt(0.14, 1.47, 0);

      const handleResize = () => {
        if (!canvas) return;
        const w = canvas.clientWidth || (size === 'sm' ? 140 : size === 'lg' ? 240 : 190);
        const h = canvas.clientHeight || (size === 'sm' ? 170 : size === 'lg' ? 290 : 230);
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      handleResize();
      window.addEventListener('resize', handleResize);

      // Verbatim lights from DreamPath-Ask-Dreamy.html
      scene.add(new THREE.HemisphereLight(0xd9d2ff, 0x1a1040, 0.55));
      const light = (color: number, intensity: number, x: number, y: number, z: number) => {
        const l = new THREE.DirectionalLight(color, intensity);
        l.position.set(x, y, z);
        scene.add(l);
      };
      light(0xffffff, 1.7, -3, 5, 6); // key
      light(0x7c5cff, 3.2, -5, 2.5, -2.5); // violet rim
      light(0xff5cae, 2.8, 5, 1.5, -2.5); // pink rim
      light(0x4fd8ff, 1.2, 0.5, -4, 3); // cyan from below

      // ---------------------------------------------------------------- textures made in code
      const paint = (w: number, h: number, fn: (g: CanvasRenderingContext2D, w: number, h: number) => void) => {
        const c = document.createElement('canvas');
        c.width = w;
        c.height = h;
        const ctx = c.getContext('2d');
        if (ctx) fn(ctx, w, h);
        const t = new THREE.CanvasTexture(c);
        t.colorSpace = THREE.SRGBColorSpace;
        return t;
      };

      const planetTex = paint(256, 128, (g, w, h) => {
        const lg = g.createLinearGradient(0, 0, 0, h);
        lg.addColorStop(0, '#FFD0E4');
        lg.addColorStop(0.5, '#F6A9CB');
        lg.addColorStop(1, '#D06A9C');
        g.fillStyle = lg;
        g.fillRect(0, 0, w, h);
        const band = (y: number, hh: number, color: string) => {
          g.fillStyle = color;
          g.fillRect(0, y * h, w, hh * h);
        };
        band(0.4, 0.085, 'rgba(255,240,247,0.85)');
        band(0.6, 0.07, 'rgba(190,90,140,0.45)');
        band(0.24, 0.03, 'rgba(255,236,246,0.4)');
        band(0.76, 0.03, 'rgba(170,76,128,0.3)');
      });

      const ringTex = paint(256, 4, (g, w, h) => {
        const lg = g.createLinearGradient(0, 0, w, 0);
        [
          ['#A7F3D0', 0],
          ['#FDE68A', 0.28],
          ['#C4B5FD', 0.55],
          ['#F9A8D4', 0.8],
          ['#A7F3D0', 1],
        ].forEach(([c, p]) => lg.addColorStop(Number(p), c as string));
        g.fillStyle = lg;
        g.fillRect(0, 0, w, h);
      });

      const glowTex = paint(64, 64, (g) => {
        const rg = g.createRadialGradient(32, 32, 0, 32, 32, 32);
        rg.addColorStop(0, 'rgba(255,255,255,1)');
        rg.addColorStop(0.35, 'rgba(255,255,255,0.35)');
        rg.addColorStop(1, 'rgba(255,255,255,0)');
        g.fillStyle = rg;
        g.fillRect(0, 0, 64, 64);
      });

      const glow = (color: number, sizeVal: number, opacity: number) => {
        const s = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: glowTex,
            color,
            transparent: true,
            opacity,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        );
        s.scale.setScalar(sizeVal);
        return s;
      };

      // ---------------------------------------------------------------- materials
      const physical = (o: THREE.MeshPhysicalMaterialParameters) => new THREE.MeshPhysicalMaterial(o);
      const lit = (color: number) => new THREE.MeshBasicMaterial({ color, toneMapped: false });
      const M = {
        pearl: physical({
          color: 0xeceaf8,
          roughness: 0.26,
          clearcoat: 1,
          clearcoatRoughness: 0.05,
          iridescence: 0.45,
          iridescenceIOR: 1.35,
        }),
        lavender: physical({
          color: 0x8b6ff5,
          roughness: 0.3,
          clearcoat: 0.8,
          clearcoatRoughness: 0.08,
        }),
        visor: physical({
          color: 0x05041a,
          roughness: 0.12,
          clearcoat: 1,
          clearcoatRoughness: 0.04,
          emissive: 0x1a0d4a,
          emissiveIntensity: 0.6,
          envMapIntensity: 0.22,
        }),
        rim: new THREE.MeshStandardMaterial({
          color: 0x2a1a5e,
          emissive: 0xc27dff,
          emissiveIntensity: 1.4,
          roughness: 0.4,
        }),
        joint: new THREE.MeshStandardMaterial({
          color: 0x8a7bd0,
          metalness: 0.75,
          roughness: 0.28,
        }),
        cyan: lit(0x67e8f9),
        lilac: lit(0xb49cff),
        core: lit(0xb6f2ff),
        planet: physical({
          map: planetTex,
          roughness: 0.42,
          clearcoat: 0.7,
          clearcoatRoughness: 0.2,
          emissive: 0xf9a8d4,
          emissiveIntensity: 0.1,
        }),
        ring: new THREE.MeshStandardMaterial({
          map: ringTex,
          emissive: 0xffffff,
          emissiveMap: ringTex,
          emissiveIntensity: 0.6,
          roughness: 0.35,
        }),
        moons: [lit(0xa7f3d0), lit(0xfde68a), lit(0xc4b5fd)],
      };

      const materialFor = (name: string) => {
        if (name.startsWith('VisorRim')) return M.rim;
        if (name.startsWith('Visor')) return M.visor;
        if (name.startsWith('PlanetRing')) return M.ring;
        if (name.startsWith('Planet')) return M.planet;
        if (name.startsWith('Moon')) return M.moons[+name.slice(4, 5) % 3];
        if (/^(EarRing|JetGlow)/.test(name)) return M.cyan;
        if (/^(NeckGlow|WaistSeam|HaloRing)/.test(name)) return M.lilac;
        if (name.startsWith('CoreRing')) return M.lavender;
        if (name.startsWith('Core')) return M.core;
        if (name.startsWith('Neck')) return M.joint;
        if (/^(EarCap|Head|Body|Arm)/.test(name)) return M.pearl;
        if (/^(Ear|Jet)/.test(name)) return M.lavender;
        return M.pearl;
      };

      // ---------------------------------------------------------------- load Blender model
      const loader = new GLTFLoader();
      loader.load(
        '/models/dreamy.glb',
        (gltf) => {
          const model = gltf.scene;
          const rig = new THREE.Group();
          rig.add(model);
          scene.add(rig);

          model.traverse((o: any) => {
            if (o.isMesh) {
              o.material = materialFor(o.parent && o.parent.isMesh ? o.parent.name : o.name);
            }
          });

          const node = (n: string) => model.getObjectByName(n);
          const head = node('HeadPivot') as THREE.Object3D;
          const visor = node('Visor') as THREE.Mesh;
          const armR = node('Shoulder1') as THREE.Object3D;
          const armL = node('Shoulder-1') as THREE.Object3D;
          const halo = node('HaloRing') as THREE.Object3D;
          const pivot = node('PlanetPivot') as THREE.Object3D;
          const planet = node('Planet') as THREE.Object3D;
          const ring = node('PlanetRing') as THREE.Object3D;
          const moons = [node('Moon0'), node('Moon1'), node('Moon2')];

          if (pivot) {
            pivot.position.set(0.66, 2.9, 0);
            pivot.rotation.set(0.42, 0, -0.3);
            const planetGlow = glow(0xf9a8d4, 1.5, 0.35);
            pivot.add(planetGlow);
          }

          const coreNode = node('Core');
          let coreGlow: THREE.Sprite | null = null;
          if (coreNode && coreNode.parent) {
            coreGlow = glow(0x8fe9ff, 0.55, 0.5);
            coreGlow.position.copy(coreNode.position).add(new THREE.Vector3(0, 0, 0.06));
            coreNode.parent.add(coreGlow);
          }

          // ---------------------------------------------------------------- face & eyes
          scene.updateMatrixWorld(true);
          const headPos = head ? head.getWorldPosition(new THREE.Vector3()) : new THREE.Vector3(0, 1.4, 0);
          const FACE_Y = headPos.y + 0.57;
          const ray = new THREE.Raycaster();
          const fwd = new THREE.Vector3(0, 0, 1);
          const face = new THREE.Group();
          if (head) head.add(face);

          const faceGlow = lit(0x7af0ff);
          const parts: {
            [key: string]: Array<{ mesh: THREE.Mesh; base: THREE.Vector3; k: number }>;
          } = {};

          const addPart = (
            key: string,
            geo: THREE.BufferGeometry,
            x: number,
            dy: number,
            sx = 1,
            sy = 1,
            sz = 1,
            rotZ = 0
          ) => {
            if (visor) {
              ray.set(new THREE.Vector3(x, FACE_Y + dy, 5), new THREE.Vector3(0, 0, -1));
              const hits = ray.intersectObject(visor, true);
              const hit = hits[0];
              const holder = new THREE.Group();
              holder.position.set(x, FACE_Y + dy - headPos.y, (hit ? hit.point.z : 0.69) + 0.014);
              if (hit && hit.face) {
                holder.quaternion.setFromUnitVectors(
                  fwd,
                  hit.face.normal.clone().transformDirection(visor.matrixWorld)
                );
              }
              const mesh = new THREE.Mesh(geo, faceGlow);
              mesh.rotation.z = rotZ;
              holder.add(mesh);
              face.add(holder);
              (parts[key] = parts[key] || []).push({
                mesh,
                base: new THREE.Vector3(sx, sy, sz),
                k: 0,
              });
              return holder;
            }
            return new THREE.Group();
          };

          const ball = new THREE.SphereGeometry(1, 24, 16);
          const arc = new THREE.TorusGeometry(0.08, 0.023, 10, 28, Math.PI);
          const hoop = new THREE.TorusGeometry(0.062, 0.019, 10, 32);
          const eyeGlows: THREE.Sprite[] = [];

          for (const sx of [-1, 1]) {
            const h = addPart('open', ball, sx * 0.24, 0.07, 0.064, 0.094, 0.02);
            addPart('dot', ball, sx * 0.24, 0.07, 0.047, 0.047, 0.02);
            addPart('arc', arc, sx * 0.24, 0.04, 1, 1, 0.6);
            addPart('ring', hoop, sx * 0.24, 0.07, 1, 1, 0.6);
            const g = glow(0x67e8f9, 0.42, 0.3);
            g.position.z = 0.03;
            h.add(g);
            eyeGlows.push(g);
          }

          addPart('smile', new THREE.TorusGeometry(0.085, 0.018, 10, 28, Math.PI * 0.7), 0, -0.1, 1, 1, 0.6, Math.PI * 1.15);
          addPart('flat', ball, 0, -0.16, 0.046, 0.015, 0.015);
          addPart('o', new THREE.TorusGeometry(0.032, 0.014, 8, 24), 0, -0.16, 1, 1, 0.6);

          const MOODS: Record<string, Record<string, number>> = {
            idle: { open: 1, smile: 0.8 },
            listening: { open: 1, smile: 0.8 },
            happy: { arc: 1, smile: 1.15 },
            thinking: { dot: 1, flat: 1 },
            surprised: { ring: 1, o: 1 },
          };

          // ---------------------------------------------------------------- blinking timer
          let isBlinking = false;
          const scheduleBlink = () => {
            const currentMood = moodRef.current;
            if (currentMood === 'idle' || currentMood === 'listening') {
              isBlinking = true;
              setTimeout(() => {
                isBlinking = false;
              }, 130);
            }
            blinkTimer = setTimeout(scheduleBlink, 2600 + Math.random() * 3400);
          };
          blinkTimer = setTimeout(scheduleBlink, 2200);

          // ---------------------------------------------------------------- pointer eye-tracking
          let ptrX = window.innerWidth / 2;
          let ptrY = window.innerHeight / 2;
          const onPointerMove = (e: PointerEvent) => {
            ptrX = e.clientX;
            ptrY = e.clientY;
          };
          window.addEventListener('pointermove', onPointerMove, { passive: true });

          // ---------------------------------------------------------------- intro 360° spin & overshoot
          let entranceProgress = 0; // 0 to 1
          restartEntranceSpinRef.current = () => {
            entranceProgress = 0;
          };

          const s = {
            yaw: 0,
            pitch: 0,
            tilt: 0,
            wave: 0,
            lift: 0,
            spin: 1,
            big: 1,
            moon: 0,
            last: performance.now(),
          };
          const headNdc = new THREE.Vector3();
          const haloScale = halo ? halo.scale.clone() : new THREE.Vector3(1, 1, 1);
          const pivotY = pivot ? pivot.position.y : 2.9;

          const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
          const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

          // ---------------------------------------------------------------- render loop (60fps native)
          const renderFrame = (now: number) => {
            animId = requestAnimationFrame(renderFrame);
            if (document.hidden) return;

            const dt = Math.min(0.05, (now - s.last) / 1000);
            const t = now / 1000;
            const k = 1 - Math.pow(0.001, dt);
            s.last = now;

            const activeMood = moodRef.current;
            const thinking = activeMood === 'thinking';
            const dragging = isDraggingRef.current;
            const waving = isWavingRef.current;

            // Intro Entrance Spin & Spring Overshoot Sequence
            if (entranceProgress < 1) {
              entranceProgress = Math.min(1, entranceProgress + dt * 1.3);
              const c1 = 1.70158;
              const c2 = c1 + 1;
              const p = 1 + c2 * Math.pow(entranceProgress - 1, 3) + c1 * Math.pow(entranceProgress - 1, 2);
              const spinY = (1 - Math.min(1, Math.max(0, entranceProgress))) * Math.PI * 2;
              rig.rotation.y = spinY;
              rig.scale.setScalar(Math.max(0.1, Math.min(1.2, p)));
            } else {
              rig.scale.set(1, 1, 1);
            }

            // Look target
            let ty = 0;
            let tp = 0;
            if (thinking) {
              ty = 0.4 + Math.sin(t * 2.4) * 0.06;
              tp = -0.4;
            } else if (activeMood !== 'surprised' && canvas) {
              const r = canvas.getBoundingClientRect();
              headNdc.set(0, FACE_Y, 0).project(camera);
              const hx = r.left + (headNdc.x * 0.5 + 0.5) * r.width;
              const hy = r.top + (-headNdc.y * 0.5 + 0.5) * r.height;
              ty = clamp((ptrX - hx) / 420, -1, 1) * 0.68;
              tp = clamp((py_offset(ptrY) - hy) / 420, -1, 1) * 0.38;
            }

            function py_offset(py: number) {
              if (activeMood === 'listening') return py;
              return py;
            }

            s.yaw = lerp(s.yaw, ty, k * 0.9);
            s.pitch = lerp(s.pitch, tp, k * 0.9);
            if (head) {
              head.rotation.set(s.pitch, s.yaw * 0.72, 0.07 - s.yaw * 0.09);
            }
            if (face) {
              face.position.set(s.yaw * 0.03, -s.pitch * 0.03, 0);
            }

            // Body: follows head, sways gently, tilts & pitches forward when dragged
            s.tilt = lerp(s.tilt, (tiltDegRef.current || 0) * (Math.PI / 180), k);
            if (entranceProgress >= 1) {
              rig.rotation.set(
                dragging ? 0.12 : 0,
                s.yaw * 0.3 + Math.sin(t * 0.7) * 0.06,
                -s.tilt * 1.2
              );
            }

            // Arms: react to waving, happy mood, and flail realistically when dragged
            s.wave = lerp(s.wave, waving ? 1 : 0, k * 1.6);
            s.lift = lerp(s.lift, dragging ? 1 : activeMood === 'happy' ? 0.35 : 0, k * 1.4);
            const sway = Math.sin(t * 1.7) * 0.05;
            if (armR) {
              armR.rotation.z = lerp(0.26 + sway + s.lift * 0.9, 2.35 + Math.sin(t * 11) * 0.36, s.wave);
              if (dragging) armR.rotation.z += Math.sin(t * 14 + 1) * 0.2;
            }
            if (armL) {
              armL.rotation.z = -(0.26 - sway + s.lift * 0.9) - (dragging ? Math.sin(t * 14) * 0.2 : 0);
            }

            // Face parts interpolation & eye blinking
            const want = MOODS[activeMood] || MOODS.idle;
            for (const key in parts) {
              for (const p of parts[key]) {
                p.k = lerp(p.k, want[key] || 0, k * 2.4);
                p.mesh.visible = p.k > 0.03;
                p.mesh.scale.copy(p.base).multiplyScalar(p.k);
                if (key === 'open' && isBlinking) {
                  p.mesh.scale.y *= 0.12;
                }
              }
            }

            // Eye glow intensity reacts to blinking and mood
            const eyeLight = activeMood === 'surprised' || activeMood === 'happy' ? 0.4 : isBlinking ? 0.08 : 0.3;
            eyeGlows.forEach((g) => {
              g.material.opacity = lerp(g.material.opacity, eyeLight, k * 2);
            });

            // Planet and moons
            if (planet && ring && pivot) {
              s.spin = lerp(s.spin, thinking ? 6 : 1, k * 0.8);
              s.big = lerp(s.big, thinking ? 1.14 : 1, k);
              const step = dt * s.spin;
              planet.rotation.y += step * 0.5;
              ring.rotation.y -= step * 0.25;
              s.moon += step * 0.9;
              moons.forEach((m, i) => {
                if (m) {
                  const a = s.moon + i * 2.094;
                  m.position.set(Math.cos(a) * 0.54, 0, Math.sin(a) * 0.54);
                }
              });
              pivot.position.y = pivotY + Math.sin(t * 1.1) * 0.05;
              pivot.scale.setScalar(s.big * 1.3);
            }

            // Hover ring breathes
            if (halo) {
              halo.scale.copy(haloScale).multiplyScalar(1 + Math.sin(t * 2.2) * 0.05);
            }
            if (coreGlow) {
              coreGlow.material.opacity = 0.42 + Math.sin(t * 2.2) * 0.12;
            }

            renderer.render(scene, camera);
          };

          animId = requestAnimationFrame(renderFrame);

          return () => {
            window.removeEventListener('pointermove', onPointerMove);
          };
        },
        undefined,
        (err) => {
          console.warn('Failed to load dreamy.glb, using 2D avatar fallback:', err);
          setHasWebGlError(true);
        }
      );

      return () => {
        cancelAnimationFrame(animId);
        clearTimeout(blinkTimer);
        window.removeEventListener('resize', handleResize);
        renderer.dispose();
      };
    } catch (e) {
      console.warn('WebGL init failed, using fallback:', e);
      setHasWebGlError(true);
    }
  }, [size]);

  const canvasDims =
    size === 'sm'
      ? 'w-[130px] h-[160px]'
      : size === 'lg'
      ? 'w-[220px] h-[260px]'
      : 'w-[170px] sm:w-[190px] h-[200px] sm:h-[220px]';

  return (
    <div
      ref={containerRef}
      className={`relative select-none flex flex-col items-center ${className}`}
    >
      {!hasWebGlError ? (
        <canvas
          ref={canvasRef}
          className={`${canvasDims} object-contain drop-shadow-lg pointer-events-none select-none`}
        />
      ) : (
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCApHTOEso7S_JubzZh0y8FbAV0RbvATwViv1SXSJ8CwfAv0XYEs54GWpXHRDjH84_U0chGcrNGyCM2qdPUpH1-6gWIdNeb1tJeI_1jzMqLJkWRmyLWav4QszZqNHcptOt_p_geJZsS0AsvbQjU9epb9Y2ncnCIUSB2EF3UYKT40h18Zwc5tdY479xjk_AX9Kcgu62-gsc2bMKnNTZkSZxT98T3quOTuq7jY2JAzpLb1GchvYqKgtSx"
          alt="Dreamy mascot"
          className="w-[110px] h-auto object-contain drop-shadow-lg pointer-events-none select-none"
        />
      )}
    </div>
  );
}
