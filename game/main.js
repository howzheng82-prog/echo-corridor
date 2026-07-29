export class Game {
    constructor() {
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.world = {
            width: 800,
            height: 480
        };
        this.resizeCanvas();
        window.addEventListener("resize", () => this.resizeCanvas());

        // 玩家数据
        this.player = {
            x: 100,
            y: 200,
            w: 32,
            h: 48,
            speed: 4,
            worldMode: "real" // real=现实世界  mirror=镜中世界
        };

        // 镜子（切换两个世界的交互点）
        this.mirror = {
            x: 600,
            y: 150,
            w: 64,
            h: 128
        };

        // 按键监听
        this.keys = {};
        window.addEventListener("keydown", e=> this.keys[e.key.toLowerCase()] = true);
        window.addEventListener("keyup", e=> this.keys[e.key.toLowerCase()] = false);

        // 触屏移动端控制
        this.touchDir = {x:0,y:0};
        this.canvas.addEventListener("touchmove", e=>{
            const touch = e.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            this.touchDir.x = (touch.clientX - rect.left - rect.width/2)/40;
            this.touchDir.y = (touch.clientY - rect.top - rect.height/2)/40;
        });
        this.canvas.addEventListener("touchend",()=>{
            this.touchDir.x=0;this.touchDir.y=0;
        });

        this.loop();
    }

    resizeCanvas(){
        const scale = Math.min(window.innerWidth / this.world.width, window.innerHeight / this.world.height);
        this.canvas.width = this.world.width;
        this.canvas.height = this.world.height;
        this.canvas.style.width = `${this.world.width*scale}px`;
        this.canvas.style.height = `${this.world.height*scale}px`;
    }

    // 碰撞检测
    rectOverlap(a,b){
        return a.x < b.x+b.w && a.x+a.w > b.x && a.y < b.y+b.h && a.y+a.h > b.y;
    }

    update(){
        // 移动控制 键盘+触屏
        let dx=0, dy=0;
        if(this.keys["a"]||this.keys["arrowleft"]) dx -=1;
        if(this.keys["d"]||this.keys["arrowright"]) dx +=1;
        if(this.keys["w"]||this.keys["arrowup"]) dy -=1;
        if(this.keys["s"]||this.keys["arrowdown"]) dy +=1;
        dx += this.touchDir.x;
        dy += this.touchDir.y;

        if(dx||dy){
            const len = Math.hypot(dx,dy);
            dx /= len; dy /= len;
            this.player.x += dx * this.player.speed;
            this.player.y += dy * this.player.speed;
        }

        // 边界限制
        this.player.x = Math.max(0, Math.min(this.world.width - this.player.w, this.player.x));
        this.player.y = Math.max(0, Math.min(this.world.height - this.player.h, this.player.y));

        // 触碰镜子切换世界
        if(this.rectOverlap(this.player, this.mirror)){
            if(this.keys[" "] || this.touchDir.x !==0){
                if(this.player.worldMode === "real"){
                    this.player.worldMode = "mirror";
                }else{
                    this.player.worldMode = "real";
                }
                this.keys[" "] = false;
            }
        }
    }

    render(){
        const ctx = this.ctx;
        // 根据世界切换底色
        if(this.player.worldMode === "real"){
            ctx.fillStyle = "#f0ece8"; //现实 明亮色调
        }else{
            ctx.fillStyle = "#22222c"; //镜中 昏暗低饱和
        }
        ctx.fillRect(0,0,this.world.width,this.world.height);

        // 绘制镜子
        ctx.fillStyle = "#88aacc";
        ctx.fillRect(this.mirror.x, this.mirror.y, this.mirror.w, this.mirror.h);

        // 绘制玩家色块（后续替换图片）
        if(this.player.worldMode === "real"){
            ctx.fillStyle = "#333333";
        }else{
            ctx.fillStyle = "#dddddd";
        }
        ctx.fillRect(this.player.x, this.player.y, this.player.w, this.player.h);

        // 文字提示
        ctx.fillStyle = this.player.worldMode==="real" ? "#111":"#eee";
        ctx.font = "18px sans-serif";
        ctx.fillText(this.player.worldMode==="real"?"现实世界":"镜中世界",20,30);
        ctx.fillText("靠近镜子按空格切换世界",20,60);
    }

    loop(){
        this.update();
        this.render();
        requestAnimationFrame(()=>this.loop());
    }
}