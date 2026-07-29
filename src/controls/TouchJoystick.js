export class TouchJoystick{
    constructor(game){
        this.game = game;
        this.box = document.getElementById("joystickBox");
        this.dot = document.getElementById("joystickDot");
        this.maxRadius = this.box.offsetWidth / 2 - 24;
        this.vector = {x:0, y:0};

        this.bindTouch();
    }

    bindTouch(){
        this.box.addEventListener("touchstart", e=>{
            e.preventDefault();
            this.moveDot(e.touches[0]);
        })
        this.box.addEventListener("touchmove", e=>{
            e.preventDefault();
            this.moveDot(e.touches[0]);
        })
        this.box.addEventListener("touchend", ()=>this.reset());
        this.box.addEventListener("touchcancel", ()=>this.reset());
    }

    moveDot(touch){
        const rect = this.box.getBoundingClientRect();
        let x = touch.clientX - rect.left - rect.width/2;
        let y = touch.clientY - rect.top - rect.height/2;

        const length = Math.hypot(x,y);
        if(length > this.maxRadius){
            x = x / length * this.maxRadius;
            y = y / length * this.maxRadius;
        }

        this.dot.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        this.vector.x = x / this.maxRadius;
        this.vector.y = y / this.maxRadius;
    }

    reset(){
        this.dot.style.transform = "translate(-50%,-50%)";
        this.vector.x = 0;
        this.vector.y = 0;
    }
}
