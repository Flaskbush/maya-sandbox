import * as THREE from 'three';

export class CapsulePlayer {
  constructor({
    position = new THREE.Vector3(0, 2, 0),
    radius = 0.35,
    height = 1.7,
    gravity = 20
  } = {}) {
    this.position = position.clone();
    this.velocity = new THREE.Vector3();

    this.radius = radius;
    this.height = height;
    this.gravity = gravity;

    this.isGrounded = false;

    this.up = new THREE.Vector3(0, 1, 0);
  }

  get bottom() {
    return this.position.y - this.height * 0.5;
  }

  get top() {
    return this.position.y +this.height * 0.5;
  }

  updatePhysics(delta) {
    if (!this.isGrounded) {
      this.velocity.y -= this.gravity * delta;
    }

    this.position.addScaledVector(this.velocity, delta);
  }

  snapToGround(groundY) {
    this.position.y = groundY + this.height * 0.5;
    this.velocity.y = 0;
    this.isGrounded = true;
  }
}




