"use client";
import { Canvas } from "@react-three/fiber";
import { Component, type ReactNode, type RefObject } from "react";
import type { HeroMotion } from "@/lib/hero/terrain";
import Scene from "./scene";

class CanvasBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}
export default function HeroCanvas(props: { motion: RefObject<HeroMotion>; onReady: () => void; onFailure: () => void }) {
  return <CanvasBoundary onFailure={props.onFailure}>
    <Canvas camera={{ fov: 36, near: .1, far: 100 }} dpr={[1, 1.5]} frameloop="demand" gl={{ antialias: true, alpha: false }}>
      <Scene {...props} />
    </Canvas>
  </CanvasBoundary>;
}
