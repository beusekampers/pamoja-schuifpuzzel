class Game {

    public player : Player;
    private testBlock : Block;
    private testBlock2 : Block;
    private testBlock3 : Block;
    private door : Door;
    private finish : Finish;
    private character : Character;
    private furniture : Array<Block>;
    private coins : Array<Coin>;
    private coinCounter : HTMLElement;
    private coinCount : number = 0;
    private grid:Array<number>;
    private gameFinished: boolean = false;
    private finishCount : number = 0;
    private end : End;

    constructor() {
        // create player
        this.player = new Player(100, 100);
        // create door
        this.door = new Door(580, 200);
        // create finish
        this.finish = new Finish();
        // create character
        this.character = new Character(210, 210);
        // create furniture
        this.furniture = new Array<Block>();
        this.furniture.push(new Block(2, "couch", "hor", 300, 400));
        this.furniture.push(new Block(1, "bed", "hor", 0, 200));
        this.furniture.push(new Block(1, "table", "vert", 300, 100));
        this.furniture.push(new Block(1, "table", "vert", 400, 200));
        // create coin counter
        this.coinCounter = document.createElement("coinCounter");
        document.body.appendChild(this.coinCounter);
        this.coinCounter.innerHTML = "Munten: "+this.coinCount+"/3";
        // create coins
        this.coins = new Array<Coin>();
        this.coins.push(new Coin(325, 25, this));
        this.coins.push(new Coin(25, 225, this));
        this.coins.push(new Coin(325, 425, this));
        
        // game loop
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    private gameLoop(){
        // console.log(this.player.rightSpeed);
        this.player.move();

        // check if finish conditions are met
        this.finishCounter();

        // coin hit detector
        for(let c of this.coins){
            if(c.collision()){
                this.updateCoinCount();
                this.coins.splice(this.coins.indexOf(c), 1);
                c.remove();
                c = undefined;
                console.log(this.coins);

            } else {

            }
        }

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
                    f.posX += f.rightSpeed;
                    f.div.style.left = f.posX + "px";
                    // console.log("Move right!");
                    // this.player.rightSpeed = 0;
                }
                if(f.rightHit){
                    f.posX -= f.leftSpeed;
                    f.div.style.left = f.posX + "px";
                    // console.log("Move left!");
                    // this.player.leftSpeed = 0;
                }
                if(f.bottomHit){
                    f.posY -= f.upSpeed;
                    f.div.style.top = f.posY + "px";
                    // console.log("Move up!");
                    // this.player.downSpeed = 0; 
                }
                if(f.topHit){
                    f.posY += f.downSpeed;
                    f.div.style.top = f.posY + "px";
                    // console.log("Move down!");
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
        }     

        //check if any Furniture from the array is touching the finish path  
        if(this.furniture.every(this.finishChecker)){
            this.character.move();
            // test end
            if(this.end == null){
                this.end = new End();
            } else{
                
            }
            
        }
        
        // hiermee wordt de gameloop opnieuw aangeroepen
        requestAnimationFrame(this.gameLoop.bind(this)); 
    }

    private finishCounter() : void{
        for(let f of this.furniture){ 
        // Check if furniture is touching the finish
            if (f.posX              < this.finish.posX + this.finish.width && 
                f.posX + f.width    > this.finish.posX &&
                f.posY              < this.finish.posY + this.finish.height &&
                f.height + f.posY   > this.finish.posY) {
                    f.touchingFinish = false;
            } else {              
                f.touchingFinish = true;
            }
        }
    }

    private finishChecker(el){
        if(el.touchingFinish){
            // console.log(el.touchingFinish);
            return true;
        } else{
            // console.log(el.touchingFinish);
            return false;
        }
    }

    private updateCoinCount() : void {
        this.coinCount++;
        this.coinCounter.innerHTML = "Munten: "+this.coinCount+"/3";
    }

} 