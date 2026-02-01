import * as THREE from 'three';

export function axesHelper(size = 1) {
  const axes = new THREE.AxesHelper(size);
  return axes;
}

export  function gridHelper(size = 10, divisions = 10) {
  const grid = new THREE.GridHelper(size, divisions);
  return grid;
}

