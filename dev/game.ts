class Game {

    public player : Player;
    private door : Door;
    private finish : Finish;
    private character : Character;
    private furniture : Array<Furniture>;
    private coins : Array<Coin>;
    private grid : Array<any>;
    private coinCounter : HTMLElement;
    private coinCount : number = 0;
    private gameFinished: boolean = false;
    private end : End;

    constructor() {

        // create player
        this.player = new Player(100, 100);

        // create door
        this.door = new Door(580, 200);

        // create finish
        this.finish = new Finish();

        // create character
        this.character = new Character(210, 210);

        // create furniture
        this.furniture = new Array<Furniture>();
        this.furniture.push(new Sofa(2, "hor", 300, 400, this));
        // this.furniture.push(new Bed(1, "hor", 0, 200, this));
        this.furniture.push(new Sofa(1, "hor", 0, 200, this));//bed replacement
        this.furniture.push(new Table(1, "vert", 300, 100, this));
        this.furniture.push(new Table(1, "vert", 400, 200, this));

        // create coin counter
        this.coinCounter = document.createElement("coinCounter");
        document.body.appendChild(this.coinCounter);
        this.coinCounter.innerHTML = "Munten: "+this.coinCount+"/3";

        // create coins
        this.coins = new Array<Coin>();
        this.coins.push(new Coin(325, 25, this));
        this.coins.push(new Coin(25, 225, this));
        this.coins.push(new Coin(325, 425, this));
        
        // game loop
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    private gameLoop(){
        // console.log(this.player.rightSpeed);
        this.player.move();

        // check if finish conditions are met
        this.finishCounter();

        // coin hit detector
        for(let c of this.coins){
            if(c.collision()){
                this.updateCoinCount();
                this.coins.splice(this.coins.indexOf(c), 1);
                c.remove();
                c = undefined;
                console.log(this.coins);

            } else {

            }
        }

        // block player collision detection
        for(let f of this.furniture){            
            f.move();
            //check if shape is hit
            f.collision();
        }     

        // check if any Furniture from the array is touching the finish path  
        if(this.furniture.every(this.finishChecker)){
            this.character.move();
            // test end
            if(this.end == null){
                this.end = new End();
            } else{
                
            }
        }
        
        // hiermee wordt de gameloop opnieuw aangeroepen
        requestAnimationFrame(this.gameLoop.bind(this)); 
    }

    private finishCounter() : void{
        for(let f of this.furniture){ 
        // Check if furniture is touching the finish
            if (f.posX              < this.finish.posX + this.finish.width && 
                f.posX + f.width    > this.finish.posX &&
                f.posY              < this.finish.posY + this.finish.height &&
                f.height + f.posY   > this.finish.posY) {
                    f.touchingFinish = false;
            } else {              
                f.touchingFinish = true;
            }
        }
    }

    private finishChecker(el){
        if(el.touchingFinish){
            return true;
        } else{
            return false;
        }
    }

    private updateCoinCount() : void {
        this.coinCount++;
        this.coinCounter.innerHTML = "Munten: "+this.coinCount+"/3";
    }

} 