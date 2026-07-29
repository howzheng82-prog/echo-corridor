export class WorldScene{
    constructor(game){
        this.game = game;
        this.mirrorMesh = null;
    }

    buildWorld(){
        const scene = this.game.scene;
        //光源
        const light = new THREE.PointLight(0xffffff,0.6);
        light.position.set(0,4,0);
        scene.add(light);

        //地面
        const groundGeo = new THREE.PlaneGeometry(30,30);
        const groundMat = new THREE.MeshStandardMaterial({color:0x222228});
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        scene.add(ground);

        //镜子
        const mirrorGeo = new THREE.PlaneGeometry(2.2,3.2);
        const mirrorMat = new THREE.MeshStandardMaterial({
            color:0x99ccff,
            metalness:0.8
        });
        this.mirrorMesh = new THREE.Mesh(mirrorGeo, mirrorMat);
        this.mirrorMesh.position.set(0,1.6,-8);
        scene.add(this.mirrorMesh);
    }
}
