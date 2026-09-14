export const GRID = 129;
export const EXAGGERATION = 1.2;
export function decodeTerrain(buffer: ArrayBuffer): Float32Array {
  if (buffer.byteLength !== GRID * GRID * 2) throw new Error("Unexpected terrain dimensions");
  const view = new DataView(buffer);
  const heights = new Float32Array(GRID * GRID);
  for (let i = 0; i < heights.length; i++) {
    const height = view.getUint16(i * 2, true) / 10;
    if (height < 1000 || height > 3000) throw new Error("Invalid Nepal crop elevation");
    heights[i] = height;
  }
  return heights;
}
export interface HeroMotion { progress: number; entrance: number; render?: () => void }
export const smoothRange = (start: number, end: number, value: number) => {
  const t = Math.max(0, Math.min(1, (value - start) / (end - start)));
  return t * t * (3 - 2 * t);
};
