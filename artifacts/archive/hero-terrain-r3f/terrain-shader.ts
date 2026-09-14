export const vertexShader = /* glsl */ `
attribute float elevation;
uniform float flatten;
varying float vElevation;
varying vec3 vNormal;
varying vec2 vGround;
void main() {
  vElevation = elevation; // Original EGM2008 metres; never flatten contour values.
  vGround = position.xz;
  vNormal = normalize(vec3(normal.x * flatten, normal.y, normal.z * flatten));
  vec3 p = position;
  p.y *= flatten;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}`;
export const fragmentShader = /* glsl */ `
uniform vec3 terrainColor;
uniform vec3 highlightColor;
uniform vec3 contourColor;
uniform vec3 contourInk;
uniform vec3 paperColor;
uniform float cartographic;
uniform float paper;
uniform float entrance;
varying float vElevation;
varying vec3 vNormal;
varying vec2 vGround;
float contour(float interval, float width) {
  float level = vElevation / interval;
  float pixel = max(fwidth(level), 0.00001);
  float distanceToLine = abs(fract(level + 0.5) - 0.5);
  // Derivatives antialias fixed-height isolines and suppress unresolved bands.
  float line = 1.0 - smoothstep(pixel * width * 0.25, pixel * (width * 0.25 + 0.8), distanceToLine);
  return line * (1.0 - smoothstep(0.18, 0.4, pixel));
}
void main() {
  float light = max(dot(normalize(vNormal), normalize(vec3(-0.6, 0.7, 0.35))), 0.0);
  // Broad key-light falloff leaves the western foreground quiet for typography.
  float key = mix(0.15 + 0.85 * smoothstep(-2.5, 2.5, vGround.x), 1.0, cartographic);
  vec3 relief = mix(terrainColor * 0.24, highlightColor, light * 0.25 * key);
  relief = mix(relief, terrainColor, cartographic * 0.65);
  vec3 base = mix(relief, paperColor, paper);
  float minor = contour(50.0, 0.8);
  float major = contour(250.0, 1.3); // Every fifth contour is indexed.
  float ink = max(minor * mix(0.035, 0.38, cartographic), major * mix(0.085, 0.6, cartographic)) * key;
  gl_FragColor = vec4(mix(base, mix(contourColor, contourInk, paper), ink * entrance), 1.0);
  #include <colorspace_fragment>
}`;
