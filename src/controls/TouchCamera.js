export class TouchCamera{
    constructor(game){
        this.game = game;
        this.viewArea = document.getElementById("touchViewArea");
        this.lastX = 0;
        this.yaw = 0;
        this.speed = 0.0042;

        this.bindTouch();
    }

    bindTouch(){
        this.viewArea.addEventListener("touchstart", e=>{
            this.lastX = e.touches[0].clientX;
        });
        this.viewArea.addEventListener("touchmove", e=>{
            const dx = e.touches[0].clientX - this.lastX;
            this.yaw += dx * this.speed;
            this.lastX = e.touches[0].clientX;
        });
    }
}
