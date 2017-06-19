class Table extends Furniture{

    private sizePass : number;
    private orientationPass : string;

    constructor(size, orientation, x, y, g:Game){
        super(size, orientation, x, y, g);
        this.orientationPass = orientation;
        this.sizePass = size;

        if(this.sizePass == 1){
            if(this.orientationPass == "vert"){ 
                this.div.style.backgroundImage = "url(images/table-vert.png)";
            } else {
                this.div.style.backgroundImage = "url(images/table.png)";
            }
        } else {
            if(this.orientationPass == "vert"){
                this.div.style.backgroundImage = "url(images/table-big-vert.png)";
            } else {
                this.div.style.backgroundImage = "url(images/table-big.png)";
            }
        }
    }

}