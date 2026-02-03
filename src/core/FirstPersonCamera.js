import * as THREE from 'three';
import { InputController } from './InputController.js';

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

export class FirstPersonCamera {
  constructor(camera, domElement) {
    this.camera = camera;
    this.input = new InputController(domElement);

    // ===== Rotation =====
    this.phi = 0;   // yaw
    this.theta = 0; // pitch

    // ===== Movement =====
    // this.velocity = new THREE.Vector3();
    // this.direction = new THREE.Vector3();

    // ===== Config =====
    this.moveSpeed = 6;
    this.sprintMultiplier = 1.7;
    // this.jumpStrength = 8;
    // this.gravity = 20;
    // this.eyeHeight = 0.4;

    // ===== State =====
    // this.isGrounded = true;

    // this.camera.position.y = this.eyeHeight;

    this.moveDirection = new THREE.Vector3();
  }

  update(delta) {
    this.updateRotation(delta);
    this.updateMovementIntent(delta);
    this.input.update();
  }

  // =========================
  // Mouse Look
  // =========================
  updateRotation() {
    const sensitivity = 0.002;

    this.phi   -= this.input.current_.mouseXDelta * sensitivity;
    this.theta -= this.input.current_.mouseYDelta * sensitivity;

    this.theta = clamp(this.theta, -Math.PI / 2, Math.PI / 2);

    const yaw = new THREE.Quaternion()
      .setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.phi);

    const pitch = new THREE.Quaternion()
      .setFromAxisAngle(new THREE.Vector3(1, 0, 0), this.theta);

    this.camera.quaternion.multiplyQuaternions(yaw, pitch);
  }

  // =========================
  // WASD + Jump + Gravity
  // =========================
  updateMovementIntent() {
    const keys = this.input.current_.keys;

    // ----- Input direction -----
    this.moveDirection.set(0, 0, 0);

    if (keys['KeyW']) this.moveDirection.z += 1;
    if (keys['KeyS']) this.moveDirection.z -= 1;
    if (keys['KeyA']) this.moveDirection.x -= 1;
    if (keys['KeyD']) this.moveDirection.x += 1;

    this.moveDirection.normalize();

  }
}
/*
    // ----- Speed -----
    let speed = this.moveSpeed;
    if (keys['ShiftLeft']) speed *= this.sprintMultiplier;

    // ----- Camera-relative vectors -----
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);
    const right   = new THREE.Vector3(1, 0, 0).applyQuaternion(this.camera.quaternion);

    forward.y = 0;
    right.y = 0;
    forward.normalize();
    right.normalize();

    // ----- Horizontal velocity -----
    this.velocity.x =
      (forward.x * this.direction.z + right.x * this.direction.x) * speed;

    this.velocity.z =
      (forward.z * this.direction.z + right.z * this.direction.x) * speed;

    // ----- Jump -----
    if (keys['Space'] && this.isGrounded) {
      this.velocity.y = this.jumpStrength;
      this.isGrounded = false;
    }

    // ----- Gravity -----
    this.velocity.y -= this.gravity * delta;

    // ----- Apply movement -----
    this.camera.position.addScaledVector(this.velocity, delta);

    // ----- Ground collision (temporary flat ground) -----
    if (this.camera.position.y <= this.eyeHeight) {
      this.camera.position.y = this.eyeHeight;
      this.velocity.y = 0;
      this.isGrounded = true;
    }
  }
}
*/


/*
import * as THREE from 'three';
import { InputController } from './InputController.js';

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

export class FirstPersonCamera {
  constructor(camera, domElement) {
    this.camera = camera;
    this.input = new InputController(domElement);

    // Rotation angles / Spherical coordinates
    this.phi = 0;
    this.theta = 0;

    // Movement
    this.velocity = new THREE.Vector3();
    this.direction = new THREE.Vector3();

    // Config
    this.moveSpeed = 5; // units per second
    this.sprintMultiplier = 1.7;
    this.jumpStrength = 8;
    this.gravity = 20;
    this.eyeheight = 1.7;
    
    // State
    this.isGrounded = true;
    this.camera.position.y = this.eyeheight;
  }

  update(delta) {
    this.updateRotation(delta);
    this.updateMovement(delta);
    this.input.update();
  }

  updateRotation(delta) {
    const sensitivity = 0.002;

    this.phi   -= this.input.current_.mouseXDelta * sensitivity;
    this.theta -= this.input.current_.mouseYDelta * sensitivity;
    this.theta = clamp(this.theta, -Math.PI / 2, Math.PI / 2);

    const yaw = new THREE.Quaternion()               
      .setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.phi);

    const pitch = new THREE.Quaternion()
      .setFromAxisAngle(new THREE.Vector3(1, 0, 0), this.theta);

    this.camera.quaternion.multiplyQuaternions(yaw, pitch);

    // this.input.update();
  }

  updateMovement(delta) {
    const keys = this.input.current_.keys;

    this.direction.set(0, 0, 0);
    if (keys['KeyW']) this.direction.z -= 1;
    if (keys['KeyS']) this.direction.z += 1;
    if (keys['KeyA']) this.direction.x -= 1;
    if (keys['KeyD']) this.direction.x += 1;

    this.direction.normalize();

    // Sprint
    let speed = this.moveSpeed;
    if (keys['ShiftLeft']) {
      speed *= this.sprintMultiplier;
    }

    // Horizontal movement
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(this.camera.quaternion);

    foward.y =0;
    right.y =0;
    foward.normalize();
    right.normalize();

    this.velocity.x = (forward.x * this.direction.z + right.x * this.direction.x) * speed;
    this.velocity.z = (forward.z * this.direction.z + right.z * this.direction.x) * speed;
  }
}
*/

/*
import * as THREE from 'three';
import { InputController } from './InputController.js';

const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max)
};

export class FirstPersonCamera {
    constructor(camera) {
        this.camera_ = camera;
        this.input_ = new InputController();
        this.rotation_ = new THREE.Quaternion();
        this.translation_ = new THREE.Vector3();
        this.phi_ = 0;
        this.theta_ = 0;
    }

        update(timeElaspsedS) {
            this.updateRotation_(timeElaspsedS);
            this.updateCamera_(timeElaspsedS);
        };

        updateRotation_ (timeElaspsedS) {
            const xh = this.input_.current_.mouseXDelta / window.innerWidth;
            const yh = this.input_.current_.mouseYDelta / window.innerHeight;
            
            this.phi_ += -xh * 5;
            this.theta_ = clamp(this.theta_ + -yh * 5, -Math.PI / 3, Math.PI / 3);
            
            const qx = new THREE.Quaternion();
            qx.setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.phi_);
            const qz = new THREE.Quaternion();
            qz.setFromAxisAngle(new THREE.Vector3(1, 0, 0), this.theta_);

            const q = new THREE.Quaternion();
            q.multiply(qx);
            q.multiply(qz);

            this.rotation_.copy(q);
        };

        updateCamera_() {
            this.camera_.quaternion.copy(this.rotation_);
        }
    
}
*/