class Table extends Furniture{

    // private orientation : string;

    constructor(size, orientation, x, y, g:Game){
        let sizePass = size;
        let orientationPass = orientation
        let xPos = x;
        let yPos = y;
        let game = g; 
        super(sizePass, orientationPass, xPos, yPos, game);

        if(size == 1){
            if(orientationPass == "vert"){ 
                this.div.style.backgroundImage = "url(images/table-vert.png)";
            } else {
                this.div.style.backgroundImage = "url(images/table.png)";
            }
        } else {
            if(orientationPass == "vert"){
                this.div.style.backgroundImage = "url(images/table-big-vert.png)";
            } else {
                this.div.style.backgroundImage = "url(images/table-big.png)";
            }
        }
    }

}