import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

export class Game {
  constructor() {
    this.canvas = document.querySelector("#gameCanvas");
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("#111120");
    this.camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.1, 200);
    this.camera.position.z = 8;
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setSize(innerWidth, innerHeight);

    const cubeGeo = new THREE.BoxGeometry(1,1,1);
    const cubeMat = new THREE.MeshBasicMaterial({color:0x4488ff});
    this.box = new THREE.Mesh(cubeGeo,cubeMat);
    this.scene.add(this.box);

    this.loop();
  }

  loop(){
    requestAnimationFrame(()=>this.loop());
    this.box.rotation.y += 0.01;
    this.renderer.render(this.scene,this.camera);
  }
}

// 启动游戏
new Game();
