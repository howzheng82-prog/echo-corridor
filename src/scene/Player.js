import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

export class Player{
    constructor(game){
        this.game = game;
        this.obj = new THREE.Object3D();
        this.obj.position.set(0,1.6,6);
        this.moveSpeed = 0.07;

        game.scene.add(this.obj);
    }

    update(){
        const stick = this.game.joystick.vector;
        const yaw = this.game.touchCamera.yaw;

        this.obj.rotation.y = yaw;

        //前后左右移动向量
        const forward = new THREE.Vector3(0,0,-1);
        forward.applyQuaternion(this.obj.quaternion);
        this.obj.position.addScaledVector(forward, stick.y * this.moveSpeed);

        const right = new THREE.Vector3(1,0,0);
        right.applyQuaternion(this.obj.quaternion);
        this.obj.position.addScaledVector(right, stick.x * this.moveSpeed);

        //相机跟随玩家
        this.game.camera.position.copy(this.obj.position);
    }
}
