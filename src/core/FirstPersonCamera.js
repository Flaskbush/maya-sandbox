import * as THREE from 'three';
import { InputController } from './InputController.js';

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

export class FirstPersonCamera {
  constructor(camera, domElement) {
    this.camera = camera;
    this.input = new InputController(domElement);

    this.phi = 0;
    this.theta = 0;
  }

  update(delta) {
    const sensitivity = 0.002;

    this.phi   -= this.input.current_.mouseXDelta * sensitivity;
    this.theta -= this.input.current_.mouseYDelta * sensitivity;
    this.theta = clamp(this.theta, -Math.PI / 2, Math.PI / 2);

    const yaw = new THREE.Quaternion()
      .setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.phi);

    const pitch = new THREE.Quaternion()
      .setFromAxisAngle(new THREE.Vector3(1, 0, 0), this.theta);

    this.camera.quaternion.multiplyQuaternions(yaw, pitch);

    this.input.update();
  }
}



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