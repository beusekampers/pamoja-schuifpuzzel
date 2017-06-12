class Start {

    private div : HTMLElement;
    private title : HTMLElement;
    private button : HTMLElement;

    constructor(){
        this.div = document.createElement("startContainer");

        this.title = document.createElement("startTitle");
        this.div.appendChild(this.title);
        this.title.innerHTML = "Schuifpuzzel game!";

        this.button = document.createElement("button");
        this.div.appendChild(this.button);
        this.button.innerHTML = "START";
        this.button.id = "startButton";

        document.body.appendChild(this.div);
    }

    public remove() : void {
        this.title.remove();
        this.title = undefined;
        this.button.remove();
        this.button = undefined;
        this.div.remove();
        this.div = undefined;
    }

}