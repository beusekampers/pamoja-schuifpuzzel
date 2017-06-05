class Game {

    private player : Player;
    private testBlock : Block;
    private testBlock2 : Block;
    private testBlock3 : Block;
    private door : Door;
    private finish : Finish;
    private character : Character;
    private furniture : Array<Block>;
    private grid:Array<number>;
    private gameFinished: boolean = false;
    private finishCount : number = 0;

    constructor() {
        // create player
        this.player = new Player(100, 100);
        // create door
        this.door = new Door(580, 200);
        // create finish
        this.finish = new Finish();
        // create character
        this.character = new Character();
        // create furniture
        this.furniture = new Array<Block>();
        this.furniture.push(new Block(2, "couch", "hor", 300, 400));
        this.furniture.push(new Block(1, "bed", "hor", 0, 200));
        this.furniture.push(new Block(1, "table", "vert", 300, 100));
        this.furniture.push(new Block(1, "table", "vert", 400, 200));
        
        this.grid = new Array<number>(6);
        // for(let i:number = 0; i > 3; i++){
        //     this.grid[i] = new Array(6);
        // }        
        
        this.finishCounter();
        // game loop
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    private gameLoop(){
        // console.log(this.player.rightSpeed);
        this.player.move();

        // block player collision detection
        for(let f of this.furniture){            
            f.move();
            //check if shape is hit
            if (this.player.posX < f.posX + f.width && 
                this.player.posX + this.player.width > f.posX &&
                this.player.posY < f.posY + f.height &&
                this.player.height + this.player.posY > f.posY) {
                // console.log("Main collision!");
                if(f.leftHit){
                    // console.log("Move right!");
                    f.posX += f.rightSpeed;
                    f.div.style.left = f.posX + "px";
                    // this.player.rightSpeed = 0;
                }
                if(f.rightHit){
                    // console.log("Move left!");
                    f.posX -= f.leftSpeed;
                    f.div.style.left = f.posX + "px";
                    // this.player.leftSpeed = 0;
                }
                if(f.bottomHit){
                    // console.log("Move up!");
                    f.posY -= f.upSpeed;
                    f.div.style.top = f.posY + "px";
                    // this.player.downSpeed = 0;
                }
                if(f.topHit){
                    // console.log("Move down!");
                    f.posY += f.downSpeed;
                    f.div.style.top = f.posY + "px";
                    // this.player.upSpeed = 0;
                }
                
            }
            if(this.player.posX + this.player.width == f.posX){
                // console.log("left hit!");
                f.leftHit = true;
            } else {f.leftHit = false;}
            if(this.player.posX == f.posX + f.width){
                // console.log("right hit!");
                f.rightHit = true;
            } else {f.rightHit = false;}
            if(this.player.posY == f.posY + f.height){
                // console.log("bottom hit!");
                f.bottomHit = true;
            } else {f.bottomHit = false;}
            if(this.player.posY + this.player.height == f.posY ){
                // console.log("top hit!");
                f.topHit = true;
            } else {f.topHit = false}

            // if (this.finish.posX                        < f.posX + f.width && 
            //     this.finish.posX + this.finish.width    > f.posX &&
            //     this.finish.posY                        < f.posY + f.height &&
            //     this.finish.height + this.finish.posY   > f.posY) {
            //     console.log("Doorway blocked...");
            //     this.gameFinished = false;
            // } else {                
            //     console.log("Doorway cleared...");
            //     this.gameFinished = true;
            // }
        }       
        if(this.allTrue(this.furniture)){
            console.log("GAME UITGESPEELD!");
        }
        
        // console.log(this.furniture);
        // console.log(this.furniture.every(this.checkFinishCounter));
        // hiermee wordt de gameloop opnieuw aangeroepen
        requestAnimationFrame(this.gameLoop.bind(this)); 
    }

    private finishCounter() : void{
        for(let f of this.furniture){ 
        // Check if furniture is touching the finish
            if (f.posX < this.finish.posX + this.finish.width && 
                f.posX + f.width > this.finish.posX &&
                f.posY < this.finish.posY + this.finish.height &&
                f.height + f.posY > this.finish.posY) {
                    f.touchingFinish = true;
                // console.log("Doorway blocked...");
                // this.gameFinished = false;
            } else {              
                // console.log("Doorway cleared...");
                // this.gameFinished = true;
                f.touchingFinish = false;
            }
        }

    }
    private checkFinish(el, index){
        return el.touchingFinish;
    }
    private allTrue(obj){
        for(var o in obj){
            if(!obj[o].touchingFinish){ return true;}
        }            
        return false;
    }
} 