class Sofa extends Furniture{

    private sizePass : number;
    private orientationPass : string;

    constructor(size, orientation, x, y, g:Game){
        super(size, orientation, x, y, g);
        this.orientationPass = orientation;
        this.sizePass = size;

        if(this.sizePass == 1){
            if(this.orientationPass == "vert"){ 
                this.div.style.backgroundImage = "url(images/sofa-vert.png)";
            } else {
                this.div.style.backgroundImage = "url(images/sofa.png)";
            }
        } else {
            if(this.orientationPass == "vert"){
                this.div.style.backgroundImage = "url(images/sofa-big-vert.png)";
            } else {
                this.div.style.backgroundImage = "url(images/sofa-big.png)";
            }
        }
    }

}