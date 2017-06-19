class Furniture {
    
    protected div : HTMLElement;

    private size : number;
    public width : number;
    public height : number;

    public posX : number;
    public posY : number;

    public pushable : boolean;

    private orientation : string;

    public upSpeed : number = 0;
    public downSpeed : number = 0;
    public leftSpeed : number = 0;
    public rightSpeed : number = 0;

    public touchingFinish : boolean;

    public topHit : boolean = false;
    public leftHit : boolean = false;
    public rightHit : boolean = false;
    public bottomHit : boolean = false;

    public topFurnitureHit : boolean = false;
    public leftFurnitureHit : boolean = false;
    public rightFurnitureHit : boolean = false;
    public bottomFurnitureHit : boolean = false;
    // private backgroundSize = document.body.getElement

    private game : Game;
    
    constructor(size, orientation, x, y, g:Game) {

        this.game = g;

        //catch given parameters
        // this.furn = furn;
        this.size = size;
        this.orientation = orientation;

        // creeër een div element
        this.div = document.createElement("block");
        
        //check orientation
        //horizontal sizes
        if(this.orientation == "hor"){
            //add class to define orientation
            this.div.classList.add("hor");
            //determine size of the block based on orientation
            if(this.size == 1){
                this.width = 200;
                this.div.style.width = "200px";
            } else if(this.size == 2){
                this.width = 300;
                this.div.style.width = "300px";
            }
            this.height = 100;
            this.div.style.height = "100px";
        }
        //vertical sizes
        if(this.orientation == "vert"){
            //add class to define orientation
            this.div.classList.add("vert");
            //determine size of the block based on orientation
            if(this.size == 1){
                this.height = 200;
                this.div.style.height = "200px";
            } else if(this.size == 2){
                this.height = 300;
                this.div.style.height = "300px";
            }
            this.width = 100;
            this.div.style.width = "100px";
        }

        //position the block
        this.posX = x;
        this.posY = y;
        this.div.style.left = x + "px";
        this.div.style.top = y + "px";
                
        //place block in document
        document.body.appendChild(this.div);
    }

    public move() : void {
        // stop if against wall

        // top & bottom
        if(this.posY <= 0){
            this.upSpeed = 0;
            // console.log("blocked top");
        } else {
            this.upSpeed = 100;
        }
        if(this.posY + (this.height - 100) >= 500){
            this.downSpeed = 0;
            // console.log("blocked bottom");
        } else {
            this.downSpeed = 100;
        }

        // left & right
        if(this.posX < 100){
            this.leftSpeed = 0;
            // console.log("blocked left");
        } else {
            this.leftSpeed = 100;
        }
        if(this.posX + (this.width -100) > 400){
            this.rightSpeed = 0;
            // console.log("blocked right");
        } else {
            this.rightSpeed = 100;
        }
    }

    public collision() : void {
        if (this.game.player.posX                           < this.posX + this.width && 
            this.game.player.posX + this.game.player.width  > this.posX &&
            this.game.player.posY                           < this.posY + this.height &&
            this.game.player.height + this.game.player.posY > this.posY) 
            {
            if(this.leftHit){
                // move object right
                this.posX += this.rightSpeed;
                this.div.style.left = this.posX + "px";
                // this.player.rightSpeed = 0;
            }
            if(this.rightHit){
                // move object left
                this.posX -= this.leftSpeed;
                this.div.style.left = this.posX + "px";
                // this.player.leftSpeed = 0;
            }
            if(this.bottomHit){
                // move object up
                this.posY -= this.upSpeed;
                this.div.style.top = this.posY + "px";
                // this.player.downSpeed = 0; 
            }
            if(this.topHit){
                // move object down
                this.posY += this.downSpeed;
                this.div.style.top = this.posY + "px";
                // this.player.upSpeed = 0;
            }
        }
        // detect what side object is hit
        if(this.game.player.posX + this.game.player.width == this.posX){
            this.leftHit = true;
        } else {this.leftHit = false;}
        if(this.game.player.posX == this.posX + this.width){
            this.rightHit = true;
        } else {this.rightHit = false;}
        if(this.game.player.posY == this.posY + this.height){
            this.bottomHit = true;
        } else {this.bottomHit = false;}
        if(this.game.player.posY + this.game.player.height == this.posY ){
            this.topHit = true;
        } else {this.topHit = false}       
    }
}

