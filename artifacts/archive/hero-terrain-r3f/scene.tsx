"use client";
/* Three.js camera/material mutation is intentionally imperative and isolated here. */
/* eslint-disable react-hooks/immutability */
import { useThree } from "@react-three/fiber";
import { useEffect, useState, type RefObject } from "react";
import * as THREE from "three";
import { decodeTerrain, EXAGGERATION, GRID, smoothRange, type HeroMotion } from "@/lib/hero/terrain";
import { vertexShader, fragmentShader } from "./terrain-shader";

export default function Scene({ motion, onReady, onFailure }: {
  motion: RefObject<HeroMotion>; onReady: () => void; onFailure: () => void;
}) {
  const { camera, gl, invalidate, size } = useThree();
  const [objects, setObjects] = useState<{ geometry: THREE.PlaneGeometry; material: THREE.ShaderMaterial } | null>(null);
  useEffect(() => {
    const abort = new AbortController();
    let geometry: THREE.PlaneGeometry | undefined;
    let material: THREE.ShaderMaterial | undefined;
    const tokens = getComputedStyle(document.documentElement);
    const color = (token: string) => new THREE.Color(tokens.getPropertyValue(token).trim());
    fetch("/terrain/nepal.u16", { signal: abort.signal }).then(r => {
      if (!r.ok) throw new Error("Terrain unavailable");
      return r.arrayBuffer();
    }).then(buffer => {
      if (abort.signal.aborted) return;
      const heights = decodeTerrain(buffer);
      const step = size.width < 1024 ? 2 : 1;
      const segments = (GRID - 1) / step;
      geometry = new THREE.PlaneGeometry(10, 10, segments, segments);
      geometry.rotateX(-Math.PI / 2);
      const elevations = new Float32Array((segments + 1) ** 2);
      for (let row = 0; row <= segments; row++) for (let col = 0; col <= segments; col++) {
        const i = row * (segments + 1) + col;
        elevations[i] = heights[row * step * GRID + col * step];
        geometry.attributes.position.setY(i, (elevations[i] - 1250) / 1000 * EXAGGERATION);
      }
      geometry.setAttribute("elevation", new THREE.BufferAttribute(elevations, 1));
      geometry.computeVertexNormals();
      material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms: {
        terrainColor: { value: color("--terrain") }, highlightColor: { value: color("--terrain-highlight") },
        contourColor: { value: color("--contour") }, contourInk: { value: color("--contour-ink") },
        paperColor: { value: color("--background") }, flatten: { value: 1 },
        cartographic: { value: 0 }, paper: { value: 0 }, entrance: { value: 1 },
      } });
      setObjects({ geometry, material });
      invalidate();
      onReady();
    }).catch(error => { if (error.name !== "AbortError") onFailure(); });
    return () => { abort.abort(); geometry?.dispose(); material?.dispose(); };
  }, [invalidate, onFailure, onReady, size.width]);
  useEffect(() => {
    if (!objects || !(camera instanceof THREE.PerspectiveCamera)) return;
    const graphite = new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue("--hero-background").trim());
    const paper = objects.material.uniforms.paperColor.value as THREE.Color;
    const background = graphite.clone();
    const render = () => {
      const p = motion.current.progress;
      const analytical = smoothRange(.18, .78, p);
      const handoff = smoothRange(.78, 1, p);
      const angle = THREE.MathUtils.degToRad(40 + analytical * (size.width < 1024 ? 30 : 40));
      camera.fov = 36 - analytical * 12;
      // Compensate narrowing FOV; only the short deliberate approach enlarges terrain.
      const distance = (4.8 - .4 * Math.sin(Math.PI * analytical)) * Math.tan(Math.PI / 10) / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const targetY = 2.7 * (1 - analytical);
      const targetZ = -.7;
      const targetX = size.width / size.height < 1 ? 1.8 : .45;
      camera.position.set(targetX, targetY + Math.sin(angle) * distance, targetZ + Math.cos(angle) * distance);
      camera.lookAt(targetX, targetY, targetZ);
      camera.updateProjectionMatrix();
      objects.material.uniforms.flatten.value = 1 - analytical * .8;
      objects.material.uniforms.cartographic.value = analytical;
      objects.material.uniforms.paper.value = handoff;
      objects.material.uniforms.entrance.value = motion.current.entrance;
      gl.setClearColor(background.copy(graphite).lerp(paper, handoff), 1);
      invalidate();
    };
    motion.current.render = render;
    render();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => { motion.current.render = undefined; };
  }, [camera, gl, invalidate, motion, objects, size]);
  return objects && <mesh geometry={objects.geometry} material={objects.material} />;
}
