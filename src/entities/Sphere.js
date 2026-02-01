import * as THREE from 'three';

export class Sphere {
  constructor({
    radius = 0.15,
    orbitRadius = 0.5,
    orbitSpeed = 1,
    bounceSpeed = 2,
    bounceHeight = 0.5
  } = {}) {
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x2EA37E });

    this.mesh = new THREE.Mesh(geometry, material);

    this.orbitRadius = orbitRadius;
    this.orbitSpeed = orbitSpeed;
    this.bounceSpeed = bounceSpeed;
    this.bounceHeight = bounceHeight;

    this.orbitPhase = 0;
    this.bouncePhase = 0;
  }

  update(delta) {
    this.orbitPhase += delta * this.orbitSpeed;
    this.bouncePhase += delta * this.bounceSpeed;

    this.mesh.position.x = Math.cos(this.orbitPhase) * this.orbitRadius;
    this.mesh.position.z = Math.sin(this.orbitPhase) * this.orbitRadius;
    this.mesh.position.y =
      Math.abs(Math.sin(this.bouncePhase)) * this.bounceHeight + 0.15;
  }
}
