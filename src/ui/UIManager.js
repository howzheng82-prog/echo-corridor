export class UIManager{
    constructor(game){
        this.game = game;
        this.startTip = document.getElementById("startTip");
        this.enterBtn = document.getElementById("mirrorEnterBtn");
        this.exitBtn = document.getElementById("exitMirrorBtn");
    }

    startOpeningAnimation(callback){
        setTimeout(()=>{
            this.startTip.style.opacity = "1";
        },300);
        setTimeout(()=>{
            this.startTip.style.opacity = "0";
        },3500);
        setTimeout(()=>{
            this.startTip.remove();
            callback();
        },5700);
    }

    bindMirrorButtons(){
        this.enterBtn.onclick = ()=>{
            this.game.state.inMirrorScene = true;
            this.enterBtn.classList.remove("active");
            this.exitBtn.classList.add("active");
            this.game.player.obj.position.set(0,1.6,-12);
        }
        this.exitBtn.onclick = ()=>{
            this.game.state.inMirrorScene = false;
            this.exitBtn.classList.remove("active");
            this.game.player.obj.position.set(0,1.6,6);
        }
    }

    refreshMirrorButton(){
        if(this.game.state.nearMirror && !this.game.state.inMirrorScene){
            this.enterBtn.classList.add("active");
        }else{
            this.enterBtn.classList.remove("active");
        }
    }
}
