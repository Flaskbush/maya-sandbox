import * as THREE from 'three';

export class Ground {
    constructor() {
        const geometry = new THREE.PlaneGeometry(10, 10);
        const material = new THREE.MeshStandardMaterial({ color: 0x808080, side: THREE.DoubleSide });

        this.mesh = new THREE.Mesh(geometry, material);

    }
    
    update(time) {
        this.mesh.rotation.x = -Math.PI / 2; // Rotate to lie flat
    } 
}