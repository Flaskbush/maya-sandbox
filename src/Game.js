import * as THREE from 'three';
// ==== Core ====
import { createScene } from './core/Scene.js';
import { createPerspectiveCamera } from './core/Camera.js';
import { createRenderer } from './core/Renderer.js';
import { FirstPersonCamera } from './core/FirstPersonCamera.js';
// ==== Helpers ====
import { axesHelper } from './core/Helpers.js';
import { gridHelper } from './core/Helpers.js';

// ==== Entities ====
import { Cube } from './entities/Cube.js';
import { Ground } from './entities/Ground.js';
import { Sphere } from './entities/Sphere.js';

// ==== Game Loop ====
import { startGameLoop } from './core/GameLoop.js';

export class Game {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.scene = createScene();
    this.renderer = createRenderer(this.width, this.height);
    this.lastTime = 0;

    // Camera and OrbitControls

/*  ==== Perspective Camera ====  
    const { camera, controls } = createCamera(this.width, this.height, this.renderer.domElement );
    this.camera = camera;
    this.controls = controls;

*/
    // ==== First Person Camera ====
    this.camera = createPerspectiveCamera(this.width, this.height);
    this.cameraController = new FirstPersonCamera(this.camera, this.renderer.domElement);

    this.entities = [];
    this.helpers = [];

    this.initCubeMesh();
    this.initGroundMesh();
    this.initSphereMesh();
    this.initHelpers()

    this.bindInputs();
    this.start();

    window.addEventListener('resize', () => this.onResize());
  }

  // ==== Entity Initializations ====

  spawnCube(options) {
    const cube = new Cube(options);
    this.scene.add(cube.mesh);
    this.entities.push(cube);
    return cube;
  }

  initSphereMesh() {
    const sphere = new Sphere({
      orbitSpeed: 1,
      bounceSpeed: 2,
      bounceHeight: 0.5,
    });
    this.scene.add(sphere.mesh);
    this.entities.push(sphere);
  }

  initCubeMesh() {
    // Floating Cube
    this.spawnCube({
      position: new THREE.Vector3(0, 1.5, 0),
      floating: true,
      floatSpeed: 1,
      floatAmplitude: 0.3
    });

    // Grounded Cube
    this.spawnCube({
      position: new THREE.Vector3(2, 0.5, 0),
    });

    // const cube1 = new Cube();
    // const cube2 = new Cube(new THREE.Vector3(2, 0, 0));
    // this.scene.add(cube1.mesh, cube2.mesh);
    // this.entities.push(cube1, cube2);
  }

  initGroundMesh() {
    const ground = new Ground();
    this.scene.add(ground.mesh);
    this.entities.push(ground);
  }

  // ==== Helpers Initializations ====
  initHelpers() {
    this.helpersGroup = new THREE.Group();

    const axes = axesHelper(0.5);
    const grid = gridHelper(30, 30);

    this.helpersGroup.add(axes);
    this.helpersGroup.add(grid);

    this.scene.add(this.helpersGroup);

    this.helpers.push(axes, grid);

    this.helpersGroup.visible = false;
  }

  toggleHelpers() {
    if (!this.helpersGroup) return;
    this.helpersGroup.visible = !this.helpersGroup.visible;
  }

  // ==== Game Loop Methods ====
  bindInputs() {
    window.addEventListener('keydown', (event) => {
      if (event.key === 'h') {
        this.toggleHelpers();
      }
    });
  }

  update(time) {
    const delta = (time - this.lastTime) * 0.001;
    this.lastTime = time;

    for (const entity of this.entities) {
      entity.update(delta);
    }

    this.cameraController.update(delta);
/*
    if (this.controls) {
      this.controls.update();
    }
*/ 
      console.log(delta);   
  }
  render() {
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    startGameLoop(
      this.update.bind(this),
      this.render.bind(this),
      this.renderer
    );
  }

  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  }
}
