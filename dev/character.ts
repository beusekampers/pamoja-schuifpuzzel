class Character{
    private div : HTMLElement;
    private width : number;
    private height : number;
    private posX : number;
    private posY : number;

    constructor() {
        this.div = document.createElement("character");
        this.div.style.width = "80px";
        this.div.style.height = "80px";
        this.div.style.top = "210px";
        this.div.style.left = "210px";
        this.div.style.backgroundImage = "url(images/character-2.png)";
        document.body.appendChild(this.div);
    }
}