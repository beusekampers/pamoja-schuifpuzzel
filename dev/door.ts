class Door{

    private div : HTMLElement;
    private width : number;
    private height : number;
    private posX : number;
    private posY : number;

    constructor(x, y){
        this.posX = x;
        this.posY = y;
        this.div = document.createElement("door");
        document.body.appendChild(this.div);

        this.div.style.transform = "translate("+this.posX+"px,"+this.posY+"px)";
    }
}