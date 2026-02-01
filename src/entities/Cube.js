import * as THREE from 'three';

export class Cube {
  constructor() {
    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const material = new THREE.MeshNormalMaterial();

    this.mesh = new THREE.Mesh(geometry, material);
  }

  update(time) {
    this.mesh.position.y = Math.abs(Math.sin(time / 500)) * 0.2;
    this.mesh.rotation.x = time / 2000;
    this.mesh.rotation.y = time / 1000;
  }
}
