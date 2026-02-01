import * as THREE from 'three';

export class Cube {
  constructor({
    position = new THREE.Vector3(),
    floating = false,
    floatSpeed = 1,
    floatAmplitude = 0.2,
    rotationSpeed = 1
  } = {}) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial();

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.copy(position);

    // Floating / spinning
    this.floating = floating;
    this.floatSpeed = floatSpeed;
    this.floatAmplitude = floatAmplitude;
    this.rotationSpeed = rotationSpeed;

    this.baseY = position.y;
    this.phase = 0; 
  }

  update(delta) {
    if (!this.floating) return 
      this.phase += delta * this.floatSpeed;

      this.mesh.position.y =
        this.baseY + Math.sin(this.phase) * this.floatAmplitude;

      this.mesh.rotation.y += delta * this.rotationSpeed;
      this.mesh.rotation.x += delta * this.rotationSpeed * 0.5;
  }
}
