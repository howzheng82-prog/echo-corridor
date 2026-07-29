import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { UIManager } from "./ui/UIManager.js";
import { TouchJoystick } from "./controls/TouchJoystick.js";
import { TouchCamera } from "./controls/TouchCamera.js";
import { WorldScene } from "./scene/WorldScene.js";
import { Player } from "./scene/Player.js";

export class Game{
    constructor(){
        this.canvas = document.querySelector("#gameCanvas");
        // 全局状态
        this.state = {
            inMirrorScene: false,
            nearMirror: false,
            mirrorTriggerDistance: 3.8
        }

        // 初始化模块
        this.ui = new UIManager(this);
        this.joystick = new TouchJoystick(this);
        this.touchCamera = new TouchCamera(this);
        this.world = new WorldScene(this);
        this.player = new Player(this);

        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.mirrorMesh = null;

        this.ui.startOpeningAnimation(()=>{
            this.initThree();
            this.bindEvents();
            this.loop();
        });
    }

    initThree(){
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x111118);

        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        // 创建场景物体
        this.world.buildWorld();
        this.mirrorMesh = this.world.mirrorMesh;
    }

    bindEvents(){
        window.addEventListener("resize", ()=>this.onResize());
        this.ui.bindMirrorButtons();
    }

    onResize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    loop(){
        requestAnimationFrame(()=>this.loop());

        // 更新玩家移动、旋转
        this.player.update();
        // 检测玩家与镜子距离
        this.checkMirrorDistance();
        // UI更新
        this.ui.refreshMirrorButton();

        this.renderer.render(this.scene, this.camera);
    }

    checkMirrorDistance(){
        const dist = this.player.obj.position.distanceTo(this.mirrorMesh.position);
        this.state.nearMirror = dist < this.state.mirrorTriggerDistance;
    }
  }
