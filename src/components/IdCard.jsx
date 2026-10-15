import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";
import { portfolio } from "../data/portfolio";
import portraitUrl from "../assets/portrait.jpg";

gsap.registerPlugin(useGSAP);

const C = {
  burgundy: "#7A3038",
  deep: "#4E1E26",
  cream: "#F6E7E4",
  paper: "#7A3038",
  border: "#4E1E26",
};
const W = 3.05;
const H = 4.45;
const ROPE = 2.05;
const REST_TILT = (-8 * Math.PI) / 180;
const NAME = portfolio.fullName;

const rr = (ctx, x, y, w, h, r) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};

const wrap = (ctx, text, x, y, maxWidth, lineHeight) => {
  let line = "";
  for (const word of text.split(" ")) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = word;
      y += lineHeight;
    } else {
      line = next;
    }
  }
  ctx.fillText(line, x, y);
  return y + lineHeight;
};

const mkCanvas = (w, h) => {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  return canvas;
};

function drawPhoto(ctx, photo, cx, cy, radius) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  if (photo) {
    const cover = radius * 2;
    const zoom = 1.35;
    const scale = Math.max(cover / photo.width, cover / photo.height) * zoom;
    const dw = photo.width * scale;
    const dh = photo.height * scale;
    let x = cx - dw * 0.5;
    let y = cy - dh * 0.38;
    x = Math.min(x, cx - radius);
    y = Math.min(y, cy - radius);
    x = Math.max(x, cx + radius - dw);
    y = Math.max(y, cy + radius - dh);
    ctx.drawImage(photo, x, y, dw, dh);
  } else {
    ctx.fillStyle = "rgba(246,231,228,.28)";
    ctx.fill();
  }
  ctx.restore();
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.strokeStyle = C.cream;
  ctx.lineWidth = 3;
  ctx.stroke();
}

function drawFront(photo) {
  const canvas = mkCanvas(560, 827);
  const ctx = canvas.getContext("2d");
  ctx.scale(2, 2);
  const w = 280;
  const h = 413.5;
  ctx.save();
  rr(ctx, 0, 0, w, h, 24);
  ctx.clip();
  ctx.fillStyle = C.burgundy;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
  rr(ctx, 111, 12, 58, 11, 6);
  ctx.fillStyle = C.cream;
  ctx.fill();
  ctx.textAlign = "center";
  ctx.fillStyle = C.cream;
  ctx.font = "600 11px Inter,sans-serif";
  if ("letterSpacing" in ctx) ctx.letterSpacing = "3px";
  ctx.fillText("STUDENT", 140, 58);
  if ("letterSpacing" in ctx) ctx.letterSpacing = "0px";
  drawPhoto(ctx, photo, 140, 118, 46);
  ctx.fillStyle = C.cream;
  ctx.font = '600 34px "Playfair Display",Georgia,serif';
  ctx.fillText(NAME, 140, 208);
  ctx.font = "400 14px Inter,sans-serif";
  ctx.fillText("Information Technology", 140, 236);
  ctx.strokeStyle = "rgba(246,231,228,.45)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(78, 262);
  ctx.lineTo(202, 262);
  ctx.stroke();
  ctx.font = "500 13px Inter,sans-serif";
  ctx.fillText("DJSCE  ·  2024–2028", 140, 294);
  ctx.fillText("CGPA  9.35", 140, 318);
  rr(ctx, 6, 6, w - 12, h - 12, 20);
  ctx.strokeStyle = C.cream;
  ctx.lineWidth = 2;
  ctx.stroke();
  return canvas;
}

function drawBack() {
  const canvas = mkCanvas(560, 827);
  const ctx = canvas.getContext("2d");
  ctx.scale(2, 2);
  const w = 280;
  const h = 413.5;
  ctx.fillStyle = C.burgundy;
  rr(ctx, 0, 0, w, h, 24);
  ctx.fill();
  rr(ctx, 111, 12, 58, 11, 6);
  ctx.fillStyle = C.cream;
  ctx.fill();
  ctx.textAlign = "left";
  ctx.fillStyle = C.cream;
  ctx.font = '600 34px "Playfair Display",Georgia,serif';
  ctx.fillText("Also me", 22, 78);
  const items = [
    "Teaches computer basics to students with hearing impairments",
    "Learning machine learning through Andrew Ng's specialization",
    "Designs in Figma, builds in React and Next.js",
    "Secretary at DJSCSI",
  ];
  let y = 116;
  ctx.font = "14px Inter,sans-serif";
  for (const text of items) {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(29, y - 4, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = C.cream;
    y = wrap(ctx, text, 48, y, 210, 19) + 14;
  }
  rr(ctx, 6, 6, w - 12, h - 12, 20);
  ctx.strokeStyle = C.cream;
  ctx.lineWidth = 2;
  ctx.stroke();
  return canvas;
}

function drawRope() {
  const canvas = mkCanvas(96, 740);
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, 96, 0);
  gradient.addColorStop(0, "#4E1E26");
  gradient.addColorStop(0.5, "#8A3A46");
  gradient.addColorStop(1, "#4E1E26");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 96, 740);
  ctx.strokeStyle = "rgba(255,255,255,.14)";
  ctx.lineWidth = 7;
  for (let i = -96; i < 740; i += 22) {
    ctx.beginPath();
    ctx.moveTo(0, i + 96);
    ctx.lineTo(96, i);
    ctx.stroke();
  }
  ctx.fillStyle = "rgba(255,255,255,.7)";
  ctx.font = "700 22px Inter,sans-serif";
  ctx.textAlign = "center";
  for (let y = 80; y < 740; y += 150) {
    ctx.save();
    ctx.translate(48, y);
    ctx.rotate(Math.PI / 2);
    ctx.fillText("DJSCE ✦", 0, 8);
    ctx.restore();
  }
  return canvas;
}

function makeTexture(canvas) {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function roundedShape() {
  const shape = new THREE.Shape();
  const r = 0.2;
  const x = -W / 2;
  const y = -H / 2;
  shape.moveTo(x + r, y);
  shape.lineTo(x + W - r, y);
  shape.quadraticCurveTo(x + W, y, x + W, y + r);
  shape.lineTo(x + W, y + H - r);
  shape.quadraticCurveTo(x + W, y + H, x + W - r, y + H);
  shape.lineTo(x + r, y + H);
  shape.quadraticCurveTo(x, y + H, x, y + H - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  return shape;
}

export function IdCard() {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useGSAP(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch (error) {
      console.error(error);
      return undefined;
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 0.6, 0.1, 100);
    const frameCamera = () => {
      const tilt = REST_TILT;
      const cardY = -ROPE - 0.4 - H / 2;
      const cx = -cardY * Math.sin(tilt);
      const cy = cardY * Math.cos(tilt);
      const hx = (W / 2) * Math.abs(Math.cos(tilt)) + (H / 2) * Math.abs(Math.sin(tilt));
      const hy = (W / 2) * Math.abs(Math.sin(tilt)) + (H / 2) * Math.abs(Math.cos(tilt)) + 0.18;
      const tan = Math.tan((camera.fov * Math.PI) / 360);
      const z = Math.max((hx * 1.1) / (tan * camera.aspect), (hy * 1.05) / tan);
      camera.position.set(cx, cy, z);
      camera.lookAt(cx, cy, 0);
    };
    scene.add(new THREE.AmbientLight(0xffffff, 1.15));
    const key = new THREE.DirectionalLight(0xffffff, 0.85);
    key.position.set(3, 2, 6);
    scene.add(key);
    const rim = new THREE.PointLight(0xffd9b0, 0.5, 30);
    rim.position.set(-4, -2, 5);
    scene.add(rim);

    const swing = new THREE.Group();
    scene.add(swing);
    const ropeTex = makeTexture(drawRope());
    const ropeGeo = new THREE.PlaneGeometry(0.3, ROPE, 1, 80);
    ropeGeo.translate(0, -ROPE / 2, 0);
    const ropeBase = ropeGeo.attributes.position.array.slice();
    const ropeMat = new THREE.MeshStandardMaterial({ map: ropeTex, side: THREE.DoubleSide, roughness: 0.8 });
    swing.add(new THREE.Mesh(ropeGeo, ropeMat));

    const lower = new THREE.Group();
    lower.position.y = -ROPE;
    swing.add(lower);
    const metal = new THREE.MeshStandardMaterial({ color: 0xcfd3df, metalness: 0.85, roughness: 0.28 });
    const clipGeo = new THREE.BoxGeometry(0.38, 0.3, 0.09);
    const clip = new THREE.Mesh(clipGeo, metal);
    clip.position.y = -0.15;
    lower.add(clip);
    const ringGeo = new THREE.TorusGeometry(0.11, 0.026, 12, 32);
    const ring = new THREE.Mesh(ringGeo, metal);
    ring.position.y = -0.45;
    lower.add(ring);

    const card = new THREE.Group();
    card.position.y = -0.4 - H / 2;
    lower.add(card);
    const shape = roundedShape();
    const bodyGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.07, bevelEnabled: false });
    bodyGeo.translate(0, 0, -0.035);
    const bodyMat = new THREE.MeshStandardMaterial({ color: C.border, roughness: 0.6 });
    card.add(new THREE.Mesh(bodyGeo, bodyMat));

    const frontTex = makeTexture(drawFront());
    const backTex = makeTexture(drawBack());
    const faceGeo = new THREE.ShapeGeometry(shape, 16);
    const positions = faceGeo.attributes.position;
    const uvs = faceGeo.attributes.uv;
    for (let i = 0; i < positions.count; i += 1) {
      uvs.setXY(i, positions.getX(i) / W + 0.5, positions.getY(i) / H + 0.5);
    }
    uvs.needsUpdate = true;
    const backGeo = faceGeo.clone();

    const addFace = (geometry, texture, flip) => {
      const material = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.z = flip ? -0.037 : 0.037;
      if (flip) mesh.rotation.y = Math.PI;
      card.add(mesh);
      return material;
    };
    const frontMat = addFace(faceGeo, frontTex, false);
    const backMat = addFace(backGeo, backTex, true);

    const state = { y: 5, z: -0.5, twist: Math.PI * 2, idle: 0, flip: 0, tx: 0, ty: 0 };
    const pointer = { x: 0, y: 0 };

    const applyTwist = (amount) => {
      const attr = ropeGeo.attributes.position;
      for (let i = 0; i < attr.count; i += 1) {
        const x = ropeBase[i * 3];
        const y = ropeBase[i * 3 + 1];
        const angle = amount * (-y / ROPE);
        attr.setXYZ(i, x * Math.cos(angle), y, x * Math.sin(angle));
      }
      attr.needsUpdate = true;
      ropeGeo.computeVertexNormals();
    };

    const render = () => renderer.render(scene, camera);
    const tick = (time) => {
      state.tx += (pointer.x - state.tx) * 0.08;
      state.ty += (pointer.y - state.ty) * 0.08;
      swing.position.y = state.y;
      swing.rotation.z = state.z + Math.sin(time * 1.2) * 0.02 * state.idle;
      applyTwist(state.twist);
      lower.rotation.y = state.twist;
      card.rotation.y = state.flip + state.tx * 0.4 * state.idle;
      card.rotation.x = -state.ty * 0.22 * state.idle;
      render();
    };

    const timeline = gsap.timeline({ repeat: -1, paused: true });
    timeline
      .set(state, { y: 5, z: -0.22, twist: Math.PI * 2, idle: 0, flip: 0 })
      .to(state, { y: 0, duration: 1, ease: "power2.out" }, 0)
      .to(state, { z: REST_TILT, duration: 3.4, ease: "elastic.out(1, 0.28)" }, 0.35)
      .to(state, { twist: 0, duration: 3.8, ease: "power3.out" }, 0.2)
      .to(state, { idle: 1, duration: 1.2 }, 3.2)
      .to(state, { flip: Math.PI, duration: 0.9, ease: "power3.inOut" }, 5.2)
      .to(state, { flip: Math.PI * 2, duration: 0.9, ease: "power3.inOut" }, 7.6)
      .to(state, { idle: 0, duration: 0.25 }, 9.2)
      .to(state, { y: 5, duration: 0.7, ease: "power2.in" }, 9.3);

    const resize = () => {
      const box = stage.getBoundingClientRect();
      if (!box.width || !box.height) return;
      renderer.setSize(box.width, box.height, false);
      camera.aspect = box.width / box.height;
      frameCamera();
      camera.updateProjectionMatrix();
      render();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    resize();

    const ndc = (event) => {
      const box = canvas.getBoundingClientRect();
      return {
        x: ((event.clientX - box.left) / box.width) * 2 - 1,
        y: -((event.clientY - box.top) / box.height) * 2 + 1,
      };
    };
    const onMove = (event) => {
      const next = ndc(event);
      pointer.x = next.x;
      pointer.y = next.y;
    };
    const onLeave = () => {
      pointer.x = 0;
      pointer.y = 0;
    };

    let alive = true;
    let photoImg = null;
    const paintFront = () => {
      frontTex.image = drawFront(photoImg);
      frontTex.needsUpdate = true;
      render();
    };
    const photo = new Image();
    photo.onload = () => {
      if (!alive) return;
      photoImg = photo;
      paintFront();
    };
    photo.src = portraitUrl;
    document.fonts.ready.then(() => {
      if (!alive) return;
      paintFront();
      backTex.image = drawBack();
      backTex.needsUpdate = true;
      render();
    });

    if (reduced) {
      Object.assign(state, { y: 0, z: REST_TILT, twist: 0, idle: 0, flip: 0 });
      applyTwist(0);
      render();
    } else {
      gsap.ticker.add(tick);
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerleave", onLeave);
      const visibility = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) timeline.play();
        else timeline.pause();
      }, { threshold: 0.35 });
      visibility.observe(rootRef.current);

      return () => {
        alive = false;
        visibility.disconnect();
        observer.disconnect();
        gsap.ticker.remove(tick);
        canvas.removeEventListener("pointermove", onMove);
        canvas.removeEventListener("pointerleave", onLeave);
        ropeGeo.dispose();
        clipGeo.dispose();
        ringGeo.dispose();
        bodyGeo.dispose();
        faceGeo.dispose();
        backGeo.dispose();
        ropeMat.dispose();
        metal.dispose();
        bodyMat.dispose();
        frontMat.dispose();
        backMat.dispose();
        ropeTex.dispose();
        frontTex.dispose();
        backTex.dispose();
        renderer.dispose();
      };
    }

    return () => {
      alive = false;
      observer.disconnect();
      ropeGeo.dispose();
      clipGeo.dispose();
      ringGeo.dispose();
      bodyGeo.dispose();
      faceGeo.dispose();
      backGeo.dispose();
      ropeMat.dispose();
      metal.dispose();
      bodyMat.dispose();
      frontMat.dispose();
      backMat.dispose();
      ropeTex.dispose();
      frontTex.dispose();
      backTex.dispose();
      renderer.dispose();
    };
  }, { scope: rootRef });

  return (
    <div className="idcol" ref={rootRef}>
      <div className="idstage" ref={stageRef}>
        <canvas ref={canvasRef} aria-label="3D student ID card hanging from a lanyard. It drops in, untwists, and flips on a loop." />
      </div>
      {reduced ? null : <p className="idtip">Move your mouse to tilt it.</p>}
    </div>
  );
}
