class Character{
    private div : HTMLElement;
    private width : number;
    private height : number;
    private posX : number;
    private posY : number;
    private speed : number = 10;
    public animationDone : boolean = false

    constructor(x, y) {
        this.posX = x;
        this.posY = y;
        this.div = document.createElement("character");
        this.div.style.width = "80px";
        this.div.style.height = "80px";
        this.div.style.transform = "translate("+this.posX+"px,"+this.posY+"px)";
        // this.div.style.top = this.posY+"px";
        // this.div.style.left = this.posX+"px";
        this.div.style.backgroundImage = "url(images/character-2.png)";
        document.body.appendChild(this.div);
    }

    public move() {
        this.posX += this.speed;
        this.div.style.transform = "translate("+this.posX+"px,"+this.posY+"px)";
        if(this.posX == 520){
            this.speed = 0;
            this.animationDone = true;
        }
    }
}