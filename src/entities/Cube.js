import * as THREE from 'three';

export class Cube {
  constructor( {
    position = new THREE.Vector3(),
    floating = false,
    floatSpeed = 1,
    floatAmplitude = 0.2,
    spinSpeed = 1
  } = {}) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial();

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.copy(position)

    // floating config
    this.floating = floating;
    this.floatSpeed = floatSpeed;
    this.floatAmplitude = floatAmplitude;
    this.spinSpeed = spinSpeed;
    this.baseY = position.y;
  }
  update(time) {
    if (!this.floating) return;

    const t = time * 0.001;
    
    this.mesh.position.y =
      this.baseY + Math.sin(time * 0.001 * this.floatSpeed) * this.floatAmplitude;

    
    this.mesh.rotation.x = t * this.spinSpeed;
    this.mesh.rotation.y = t * this.spinSpeed * 1.3;
  }

  // update(time) {
  //   this.mesh.position.y = Math.abs(Math.sin(time / 500)) * 0.2;
  //   this.mesh.rotation.x = time / 2000;
  //   this.mesh.rotation.y = time / 1000;
  // }
}
