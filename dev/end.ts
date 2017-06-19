class End{
    private div : HTMLElement;
    private title : HTMLElement;
    private info : HTMLElement;

    constructor() {
        this.div = document.createElement("endScreen");
        document.body.appendChild(this.div);
        this.title = document.createElement("title");
        this.title.innerHTML = "De weg naar de deur is vrij!";
        this.div.appendChild(this.title);
        this.info = document.createElement("info");
        this.info.innerHTML = "Pip heeft de weg naar de deur voor jou vrij gemaakt, je bent weer een stapje dichter bij Pamoja World!"
        this.div.appendChild(this.info);
    }
}