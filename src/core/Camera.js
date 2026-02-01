import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * Creates a PerspectiveCamera with optional OrbitControls.
 * @param {number} width - viewport width
 * @param {number} height - viewport height
 * @param {HTMLElement} domElement - renderer.domElement for OrbitControls
 * @returns {object} { camera, controls }
 */
export function createCamera(width, height, domElement) {
  const camera = new THREE.PerspectiveCamera(
    75,          // FOV
    width / height, 
    0.01, 
    1000
  );

  camera.position.set(1, 1, 1);
  camera.lookAt(0, 0, 0);

  // OrbitControls
  const controls = new OrbitControls(camera, domElement);
  controls.enableDamping = true;  // smooth motion
  controls.dampingFactor = 0.05;
  controls.update();

  return { camera, controls };
}
