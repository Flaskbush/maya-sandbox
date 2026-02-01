import * as THREE from 'three';
// ==== Core ====
import { createScene } from './core/Scene.js';
import { createCamera } from './core/Camera.js';
import { createRenderer } from './core/Renderer.js';

// ==== Helpers ====
import { axesHelper } from './core/Helpers.js';
import { gridHelper } from './core/Helpers.js';

// ==== Entities ====
import { Cube } from './entities/Cube.js';
import { Ground } from './entities/Ground.js';

// ==== Game Loop ====
import { startGameLoop } from './core/GameLoop.js';



export class Game {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.scene = createScene();
    this.renderer = createRenderer(this.width, this.height);

    // Camera and OrbitControls
    const { camera, controls } = createCamera(this.width, this.height, this.renderer.domElement );
    this.camera = camera;
    this.controls = controls;

    this.entities = [];
    this.helpers = [];

    this.initCubeMesh();
    this.initGroundMesh();
    this.initHelpers()

    this.bindInputs();
    this.start();

    window.addEventListener('resize', () => this.onResize());
  }

  initCubeMesh() {
    const cube = new Cube();
    this.scene.add(cube.mesh);
    this.entities.push(cube);
  }

  initGroundMesh() {
    const ground = new Ground();
    this.scene.add(ground.mesh);
    this.entities.push(ground);
  }

  initHelpers() {
    this.helpersGroup = new THREE.Group();

    const axes = axesHelper(0.5);
    const grid = gridHelper(30, 30);

    this.helpersGroup.add(axes);
    this.helpersGroup.add(grid);

    this.scene.add(this.helpersGroup);

    this.helpers.push(axes, grid);

    this.helpersGroup.visible = false;
    // this.scene.add(this.axesHelper = axesHelper(0.5));
    // this.helpers.push(this.axesHelper);
    // this.scene.add(this.gridHelper = gridHelper(30, 30));
    // this.helpers.push(this.gridHelper);
  }

  toggleHelpers() {
    if (!this.helpersGroup) return;
    this.helpersGroup.visible = !this.helpersGroup.visible;
  }

  bindInputs() {
    window.addEventListener('keydown', (event) => {
      if (event.key === 'h') {
        this.toggleHelpers();
      }
    });
  }

  update(time) {
    for (const entity of this.entities) {
      entity.update(time);
    }

    if (this.controls) {
      this.controls.update();
    }
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
