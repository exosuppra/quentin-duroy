import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

/**
 * Hero v8 — Cosmic background (Three.js) inspired by 21st.dev horizon-hero-section
 * by lovesickfromthe6ix, palette adapted to violet/red.
 *
 * Scene: starfield (3 depth layers) + violet/red nebula + dark mountain silhouettes
 *        + atmospheric glow sphere, all post-processed with UnrealBloom.
 * Portrait : small circular avatar centered above title with violet/red gradient ring.
 * No scroll camera transitions (single hero, not a 3-scene scroll experience).
 */
export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  // Three.js scene refs
  const refs = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    composer?: EffectComposer;
    stars: THREE.Points[];
    nebula?: THREE.Mesh;
    mountains: THREE.Mesh[];
    animationId?: number;
  }>({ stars: [], mountains: [] });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0010, 0.00025);
    refs.current.scene = scene;

    const camera = new THREE.PerspectiveCamera(
      72,
      window.innerWidth / window.innerHeight,
      0.1,
      2000,
    );
    camera.position.set(0, 25, 220);
    refs.current.camera = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.6;
    refs.current.renderer = renderer;

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(
      new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.9, // strength
        0.5, // radius
        0.78, // threshold
      ),
    );
    refs.current.composer = composer;

    // --- Starfield (3 depth layers, violet/red tinted) ---
    for (let layer = 0; layer < 3; layer++) {
      const count = 4500;
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        const radius = 220 + Math.random() * 800;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);

        const c = new THREE.Color();
        const r = Math.random();
        if (r < 0.65) {
          c.setHSL(0, 0, 0.78 + Math.random() * 0.22); // bright whites
        } else if (r < 0.85) {
          c.setHSL(0.78, 0.6, 0.7); // violet (hue 0.78 ~ #7c3aed-ish)
        } else {
          c.setHSL(0.99, 0.65, 0.65); // red (hue near 0 / 360)
        }
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;

        sizes[i] = Math.random() * 2 + 0.5;
      }
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      const mat = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, depth: { value: layer } },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          uniform float time;
          uniform float depth;
          void main() {
            vColor = color;
            vec3 pos = position;
            float angle = time * 0.04 * (1.0 - depth * 0.3);
            mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
            pos.xy = rot * pos.xy;
            vec4 mv = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (320.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float a = 1.0 - smoothstep(0.0, 0.5, d);
            gl_FragColor = vec4(vColor, a);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const points = new THREE.Points(geo, mat);
      scene.add(points);
      refs.current.stars.push(points);
    }

    // --- Nebula (violet + red shader plane) ---
    const nebulaGeo = new THREE.PlaneGeometry(8000, 4000, 100, 100);
    const nebulaMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x7c3aed) }, // violet 600
        color2: { value: new THREE.Color(0xdc2626) }, // red 600
        opacity: { value: 0.42 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vElevation;
        uniform float time;
        void main() {
          vUv = uv;
          vec3 pos = position;
          float elev = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 24.0;
          pos.z += elev;
          vElevation = elev;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float opacity;
        uniform float time;
        varying vec2 vUv;
        varying float vElevation;
        void main() {
          float m = sin(vUv.x * 9.0 + time) * cos(vUv.y * 9.0 + time);
          vec3 color = mix(color1, color2, m * 0.5 + 0.5);
          float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
          alpha *= 1.0 + vElevation * 0.01;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const nebula = new THREE.Mesh(nebulaGeo, nebulaMat);
    nebula.position.z = -1050;
    scene.add(nebula);
    refs.current.nebula = nebula;

    // --- Mountain silhouettes (parallax layers) ---
    const layers = [
      { distance: -50, height: 60, color: 0x150420, opacity: 1 },
      { distance: -100, height: 80, color: 0x1f0530, opacity: 0.85 },
      { distance: -150, height: 100, color: 0x3a0a30, opacity: 0.6 },
      { distance: -200, height: 120, color: 0x4a0a20, opacity: 0.4 },
    ];
    layers.forEach((layer) => {
      const points: THREE.Vector2[] = [];
      const segments = 50;
      for (let i = 0; i <= segments; i++) {
        const x = (i / segments - 0.5) * 1000;
        const y =
          Math.sin(i * 0.1) * layer.height +
          Math.sin(i * 0.05) * layer.height * 0.5 +
          Math.random() * layer.height * 0.2 - 100;
        points.push(new THREE.Vector2(x, y));
      }
      points.push(new THREE.Vector2(5000, -300));
      points.push(new THREE.Vector2(-5000, -300));
      const shape = new THREE.Shape(points);
      const geometry = new THREE.ShapeGeometry(shape);
      const material = new THREE.MeshBasicMaterial({
        color: layer.color,
        transparent: true,
        opacity: layer.opacity,
        side: THREE.DoubleSide,
      });
      const mountain = new THREE.Mesh(geometry, material);
      mountain.position.z = layer.distance;
      scene.add(mountain);
      refs.current.mountains.push(mountain);
    });

    // --- Atmosphere glow sphere ---
    const atmoGeo = new THREE.SphereGeometry(600, 32, 32);
    const atmoMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform float time;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          // violet-red atmosphere
          vec3 atmosphere = mix(vec3(0.49, 0.23, 0.93), vec3(0.86, 0.15, 0.15), 0.5) * intensity;
          float pulse = sin(time * 2.0) * 0.1 + 0.9;
          atmosphere *= pulse;
          gl_FragColor = vec4(atmosphere, intensity * 0.22);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
    scene.add(new THREE.Mesh(atmoGeo, atmoMat));

    // --- Animation loop ---
    const animate = () => {
      refs.current.animationId = requestAnimationFrame(animate);
      const t = Date.now() * 0.001;
      refs.current.stars.forEach((s) => {
        const m = s.material as THREE.ShaderMaterial;
        if (m.uniforms) m.uniforms.time.value = t;
      });
      if (refs.current.nebula) {
        const m = refs.current.nebula.material as THREE.ShaderMaterial;
        m.uniforms.time.value = t * 0.5;
      }
      // Subtle camera float
      if (!reduce) {
        camera.position.x = Math.sin(t * 0.10) * 3;
        camera.position.y = 25 + Math.cos(t * 0.12) * 1.5;
      }
      camera.lookAt(0, 10, -600);
      // mountain parallax
      refs.current.mountains.forEach((m, i) => {
        const p = 1 + i * 0.5;
        m.position.x = Math.sin(t * 0.1) * 2 * p;
        m.position.y = 50 + Math.cos(t * 0.15) * 1 * p;
      });
      if (refs.current.composer) refs.current.composer.render();
    };
    animate();
    setIsReady(true);

    // Resize handler
    const onResize = () => {
      if (!refs.current.camera || !refs.current.renderer || !refs.current.composer) return;
      refs.current.camera.aspect = window.innerWidth / window.innerHeight;
      refs.current.camera.updateProjectionMatrix();
      refs.current.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.current.composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      if (refs.current.animationId) cancelAnimationFrame(refs.current.animationId);
      window.removeEventListener("resize", onResize);
      refs.current.stars.forEach((s) => {
        s.geometry.dispose();
        (s.material as THREE.ShaderMaterial).dispose();
      });
      refs.current.mountains.forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.MeshBasicMaterial).dispose();
      });
      if (refs.current.nebula) {
        refs.current.nebula.geometry.dispose();
        (refs.current.nebula.material as THREE.ShaderMaterial).dispose();
      }
      refs.current.renderer?.dispose();
    };
  }, []);

  // GSAP intro animations
  useEffect(() => {
    if (!isReady) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const tl = gsap.timeline();
    if (avatarRef.current) {
      tl.from(avatarRef.current, {
        scale: 0.6,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll(".title-char");
      tl.from(
        chars,
        {
          y: 180,
          opacity: 0,
          duration: 1.2,
          stagger: 0.05,
          ease: "power4.out",
        },
        "-=0.6",
      );
    }
    if (subtitleRef.current) {
      const lines = subtitleRef.current.querySelectorAll(".subtitle-line");
      tl.from(
        lines,
        { y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        "-=0.7",
      );
    }
    if (ctaRef.current) {
      tl.from(
        ctaRef.current,
        { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4",
      );
    }
    return () => {
      tl.kill();
    };
  }, [isReady]);

  const title = "Quentin DUROY";
  return (
    <section
      ref={containerRef}
      id="hero"
      className="cosmic-hero relative isolate flex flex-col items-center justify-center overflow-hidden text-center"
      style={{ minHeight: "100svh" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-10 h-full w-full"
        style={{ display: "block" }}
      />
      {/* Bottom fade to white for transition to page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-32"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.0) 50%, #ffffff 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 py-32">
        {/* Avatar */}
        <div
          ref={avatarRef}
          className="relative mb-10 inline-block"
          style={{ visibility: isReady ? "visible" : "hidden" }}
        >
          <span
            aria-hidden
            className="absolute -inset-1.5 rounded-full blur-md"
            style={{
              background:
                "conic-gradient(from 0deg, #7c3aed, #c026d3, #dc2626, #7c3aed)",
              animation: "aurora 18s linear infinite",
            }}
          />
          <span
            aria-hidden
            className="absolute -inset-[3px] rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, #7c3aed, #c026d3, #dc2626, #7c3aed)",
            }}
          />
          <img
            src="/quentin-bust.png"
            alt="Quentin DUROY"
            width={120}
            height={120}
            loading="eager"
            className="relative block h-28 w-28 rounded-full object-cover sm:h-32 sm:w-32"
            style={{
              background: "#0a0010",
              objectPosition: "center 18%",
              boxShadow:
                "0 0 0 4px rgba(255,255,255,0.04), 0 24px 50px -12px rgba(220,38,38,0.5)",
            }}
          />
        </div>

        {/* Badge */}
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium backdrop-blur"
          style={{
            borderColor: "rgba(255,255,255,0.18)",
            background: "rgba(255,255,255,0.08)",
            color: "#fce7f3",
            visibility: isReady ? "visible" : "hidden",
          }}
        >
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
              style={{ background: "#f87171" }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ background: "#ef4444" }}
            />
          </span>
          <span>Disponible pour de nouveaux projets</span>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="cosmic-title"
          style={{ visibility: isReady ? "visible" : "hidden" }}
        >
          {Array.from(title).map((c, i) => (
            <span
              key={i}
              className="title-char"
              style={c === " " ? { width: "0.3em" } : undefined}
            >
              {c === " " ? " " : c}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <div
          ref={subtitleRef}
          className="mt-6 max-w-2xl"
          style={{ visibility: isReady ? "visible" : "hidden" }}
        >
          <p className="subtitle-line text-lg text-white/90 sm:text-xl">
            Référent IA &amp; Chef de Projet Web à l'Office de Tourisme du Pays
            de Manosque
          </p>
          <p className="subtitle-line mt-2 text-lg text-white/70 sm:text-xl">
            Fondateur de LOGIQ IA · Make.com, Anthropic, agents IA
          </p>
        </div>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={{ visibility: isReady ? "visible" : "hidden" }}
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-8 py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{
              background:
                "linear-gradient(90deg, #7c3aed 0%, #c026d3 50%, #dc2626 100%)",
              boxShadow:
                "0 12px 32px -10px rgba(220,38,38,0.6), 0 0 0 1px rgba(255,255,255,0.10) inset",
            }}
          >
            <span className="relative z-10">Discuter d'un projet</span>
            <svg
              className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden
            >
              <path d="M6 3l5 5-5 5V3z" />
            </svg>
          </a>

          <a
            href="#projets"
            className="inline-flex items-center gap-2 rounded-full border px-8 py-3.5 text-base font-semibold backdrop-blur transition-all hover:-translate-y-0.5"
            style={{
              borderColor: "rgba(255,255,255,0.22)",
              background: "rgba(255,255,255,0.08)",
              color: "#ffffff",
            }}
          >
            Voir mes projets
            <svg
              className="h-4 w-4"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden
            >
              <path d="M3 6l5 5 5-5H3z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.3em]"
        style={{ color: "rgba(255,255,255,0.6)" }}
      >
        <span
          className="inline-block animate-bounce"
          style={{ animationDuration: "2s" }}
        >
          ↓
        </span>{" "}
        Scroll
      </div>
    </section>
  );
}
