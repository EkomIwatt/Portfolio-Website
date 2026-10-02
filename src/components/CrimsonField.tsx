import { useEffect, useRef } from 'react';

/**
 * Crimson aurora background on a raw WebGL canvas — NO three.js (~0 KB deps).
 * Hydrated client:visible, scoped to its section. Pauses the render loop when
 * scrolled off-screen, and does nothing under prefers-reduced-motion (a static
 * crimson gradient sits behind it as the fallback). GLSL ES 1.00 (WebGL1).
 */
const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision highp float;
uniform float iTime;
uniform vec2 iResolution;
uniform float uBalance; // 1.0 = mirror every other streak through the centre

#define NUM_OCTAVES 3

float rand(vec2 n){ return fract(sin(dot(n, vec2(12.9898,4.1414))) * 43758.5453); }
float noise(vec2 p){
  vec2 ip = floor(p); vec2 u = fract(p); u = u*u*(3.0-2.0*u);
  float res = mix(
    mix(rand(ip), rand(ip+vec2(1.0,0.0)), u.x),
    mix(rand(ip+vec2(0.0,1.0)), rand(ip+vec2(1.0,1.0)), u.x), u.y);
  return res*res;
}
float fbm(vec2 x){
  float v = 0.0; float a = 0.3; vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < NUM_OCTAVES; ++i){ v += a*noise(x); x = rot*x*2.0 + shift; a *= 0.4; }
  return v;
}

void main(){
  vec2 shake = vec2(sin(iTime*1.2)*0.005, cos(iTime*2.1)*0.005);
  vec2 p = ((gl_FragCoord.xy + shake*iResolution.xy) - iResolution.xy*0.5) / iResolution.y * mat2(6.0,-4.0,4.0,6.0);
  vec2 v; vec4 o = vec4(0.0);
  float f = 2.0 + fbm(p + vec2(iTime*5.0, 0.0)) * 0.5;

  for (float i = 0.0; i < 24.0; i++){
    // Balanced mode reflects odd streaks through the centre so they spread
    // across the whole field instead of clumping on one side.
    float side = (uBalance > 0.5 && mod(i, 2.0) > 0.5) ? -1.0 : 1.0;
    v = p + side*cos(i*i + (iTime + p.x*0.08)*0.025 + i*vec2(13.0,11.0))*3.5
          + vec2(sin(iTime*3.0+i)*0.003, cos(iTime*3.5-i)*0.003);
    float tailNoise = fbm(v + vec2(iTime*0.5, i)) * 0.3 * (1.0 - (i/24.0));
    // crimson palette: deep red -> lighter crimson, no blue/teal
    float m = 0.5 + 0.5*sin(i*0.3 + iTime*0.4);
    vec3 col = mix(vec3(0.62,0.04,0.10), vec3(1.0,0.22,0.28), m);
    vec4 auroraColors = vec4(col, 1.0);
    vec4 contrib = auroraColors * exp(sin(i*i + iTime*0.8)) / length(max(v, vec2(v.x*f*0.015, v.y*1.5)));
    float thinness = smoothstep(0.0, 1.0, i/24.0) * 0.6;
    o += contrib * (1.0 + tailNoise*0.8) * thinness;
  }

  o = pow(o/100.0, vec4(1.6));
  o = o / (1.0 + o);            // tanh-free tonemap (WebGL1)
  gl_FragColor = vec4(o.rgb*1.35, 1.0);
}
`;

interface Props {
  /** Spread streaks evenly across the field (used by the full-page backdrop). */
  balanced?: boolean;
  /** On touch devices, freeze the field after a few seconds without scrolling. */
  idlePause?: boolean;
}

const IDLE_MS = 20000;

export default function CrimsonField({ balanced = false, idlePause = false }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: true, alpha: true });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'iTime');
    const uRes = gl.getUniformLocation(prog, 'iResolution');
    gl.uniform1f(gl.getUniformLocation(prog, 'uBalance'), balanced ? 1 : 0);

    // Render at a fraction of CSS size — the aurora is soft so the upscale is
    // invisible, and it slashes per-frame fragment work (big perf win).
    const SCALE = 0.6;
    const resize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * SCALE));
      canvas.height = Math.max(1, Math.floor(h * SCALE));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let t = 0;
    let raf = 0;
    let onScreen = false;
    let lastActive = performance.now();
    // Phones/tablets only: a fixed backdrop is always on-screen, so the
    // off-screen pause never fires. Freeze on the last frame while the reader
    // is still, and resume as soon as they scroll or touch.
    // Checked live (not once at mount) so rotating, resizing or toggling a
    // browser's device mode takes effect without a reload. Touch-first OR
    // phone-width counts as a phone.
    const phone = window.matchMedia('(pointer: coarse), (max-width: 767px)');
    const pauseWhenIdle = () => idlePause && phone.matches;

    const loop = () => {
      if (pauseWhenIdle() && performance.now() - lastActive > IDLE_MS) { raf = 0; return; }
      t += 0.016;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(loop);
    };
    const start = () => { if (onScreen && !raf) raf = requestAnimationFrame(loop); };

    const wake = () => { lastActive = performance.now(); start(); };
    if (idlePause) {
      window.addEventListener('scroll', wake, { passive: true });
      window.addEventListener('touchstart', wake, { passive: true });
      phone.addEventListener('change', start); // resume if it stops being a phone
    }

    // Pause entirely when the section is off-screen.
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen) start();
      else if (raf) { cancelAnimationFrame(raf); raf = 0; }
    }, { threshold: 0 });
    io.observe(canvas);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', wake);
      window.removeEventListener('touchstart', wake);
      phone.removeEventListener('change', start);
      io.disconnect();
      ro.disconnect();
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, [balanced, idlePause]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
