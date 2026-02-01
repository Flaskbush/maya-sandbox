import * as THREE from 'three';

export class Ground {
    constructor() {
        const geometry = new THREE.PlaneGeometry(30, 30);
        const material = new THREE.MeshBasicMaterial({ color: 0x9A9395, side: THREE.DoubleSide });

        this.mesh = new THREE.Mesh(geometry, material);

    }
    
    update(time) {
        this.mesh.rotation.x = -Math.PI / 2; // Rotate to lie flat
    } 
}