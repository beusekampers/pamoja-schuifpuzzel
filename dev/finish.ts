class Finish{

    public width :number   = 280;
    public height :number  = 80;
    public posX :number = 320;
    public posY :number = 210;
    private div :HTMLElement;

    constructor(){
        //build the div
        this.div = document.createElement("finish");
        this.div.style.width = this.width+"px";
        this.div.style.height = this.height+"px";
        this.div.style.top = this.posY+"px";
        this.div.style.left = this.posX+"px";
        // this.div.style.backgroundColor = "red";
        this.div.style.backgroundImage = "url(images/direction.png)";
        document.body.appendChild(this.div);


    }
}