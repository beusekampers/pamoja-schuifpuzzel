class Player{

    private player : HTMLElement;
    public width : number = 80;
    public height : number = 80;

    public posX : number;
    public posY : number;

    private upKey : number = 87;        // W key
    public upKeyHitn : boolean = false;
    public upSpeed : number = 0;

    private downKey : number = 83;      // S key
    public downKeyHit : boolean = false;
    public downSpeed : number = 0;

    private leftKey : number = 65;      // A key
    public leftKeyHit : boolean = false;
    public leftSpeed : number = 0;

    private rightKey : number = 68;     // D key
    public rightKeyHit : boolean = false;
    public rightSpeed : number = 0;


    constructor(x, y){
        this.posX = x;
        this.posY = y;
        this.player = document.createElement("player");
        this.player.style.backgroundImage = "url(images/character-sprite.png)";
        this.player.style.backgroundPositionX = "0px";
        document.body.appendChild(this.player);
        this.player.style.transform = "translate("+this.posX+"px,"+this.posY+"px)";
        console.log("X="+this.posX+" Y="+this.posY);

        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e));
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e));
    }

    public move(){
        //up movement
        if(this.posY < 0){
            this.upSpeed = 0;
        } else {
            this.posY -= this.upSpeed;
            this.player.style.transform = "translate("+this.posX+"px,"+this.posY+"px)";
        }
        //down movement
        if(this.posY > 520){
            this.downSpeed = 0;
        } else {
            this.posY += this.downSpeed;
            this.player.style.transform = "translate("+this.posX+"px,"+this.posY+"px)";
        }
        //left movement
        if(this.posX < 0){
            this.leftSpeed = 0;
        } else {
            this.posX -= this.leftSpeed;
            this.player.style.transform = "translate("+this.posX+"px,"+this.posY+"px)";
        }
        //right movement
        if(this.posX > 520){
            this.rightSpeed = 0;
        } else {
            this.posX += this.rightSpeed;
            this.player.style.transform = "translate("+this.posX+"px,"+this.posY+"px)";
        }
    }

    private onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
        case this.upKey:
        case 38:
            this.upSpeed = 10;
            this.player.style.backgroundPositionX = "-"+this.width+"px";
            break;
        case this.downKey:
        case 40:
            this.downSpeed = 10;
            this.player.style.backgroundPositionX = "-"+this.width*3+"px";
            break;
        case this.leftKey:
        case 37:
            this.leftSpeed = 10;
            this.player.style.backgroundPositionX = "-"+this.width*2+"px";
            break;
        case this.rightKey:
        case 39:
            this.rightSpeed = 10;
            this.player.style.backgroundPositionX = "0px";
            break;
        }
    }
        
    private onKeyUp(event:KeyboardEvent):void {
        this.upSpeed = this.downSpeed = this.leftSpeed = this.rightSpeed = 0;
    }
    public removePlayer(){
        this.player.remove();

        // this.player = undefined;
    }
}