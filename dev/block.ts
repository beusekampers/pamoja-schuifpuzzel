class Block {
    
    public div : HTMLElement;
    private size : number;
    public width : number;
    public height : number;
    public posX : number;
    public posY : number;
    public pushable : boolean;
    private furn : any;
    private orientation : any;
    private postition : number; //X and Y coordinates
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
    
    constructor(size, furn, orientation, x, y) {
        //catch given parameters
        this.furn = furn;
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
                this.div.style.backgroundImage = "url(images/hor-furn.png)";
                if(furn == "bed"){          this.div.style.backgroundPosition = "0 0"; }
                else if(furn == "couch"){   this.div.style.backgroundPosition = "0 -100px"; }
                else if(furn == "table"){   this.div.style.backgroundPosition = "0 -200px"; }
            } else if(this.size == 2){
                this.width = 300;
                this.div.style.width = "300px";
                this.div.style.backgroundImage = "url(images/hor-furn-big.png)";
                if(furn == "bed"){          this.div.style.backgroundPosition = "0 0"; }
                else if(furn == "couch"){   this.div.style.backgroundPosition = "0 -100px"; }
                else if(furn == "table"){   this.div.style.backgroundPosition = "0 -200px"; }
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
                this.div.style.backgroundImage = "url(images/vert-furn.png)";
                if(furn == "bed"){          this.div.style.backgroundPosition = "0 0"; }
                else if(furn == "couch"){   this.div.style.backgroundPosition = "-100px 0"; }
                else if(furn == "table"){   this.div.style.backgroundPosition = "-200px 0"; }
            } else if(this.size == 2){
                this.height = 300;
                this.div.style.height = "300px";
                this.div.style.backgroundImage = "url(images/vert-furn-big.png)";
                if(furn == "bed"){          this.div.style.backgroundPosition = "0 0"; }
                else if(furn == "couch"){   this.div.style.backgroundPosition = "-100px 0"; }
                else if(furn == "table"){   this.div.style.backgroundPosition = "-200px 0"; }
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
        // console.log("block up speed: "+ this.upSpeed);
        // console.log("block X:"+this.posX+" Y:"+this.posY);
        if(this.posY <= 0){
            this.upSpeed = 0;
            // console.log("blocked top");
        } else {
            this.upSpeed = 100;
        }
        if(this.posY >= 500){
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
        if(this.posX + this.width/2 > 400){
            this.rightSpeed = 0;
            // console.log("blocked right");
        } else {
            this.rightSpeed = 100;
        }
    }
}

