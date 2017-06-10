/// <reference path="game.ts"/>
class Coin{
    private div : HTMLElement;
    private posX : number;
    private posY : number;
    private game : Game;
    private width : number = 50;
    private height : number = 50;

    constructor(x,y, g:Game) {
        this.game = g;
        this.posX = x;
        this.posY = y;
        this.div = document.createElement("coin");
        document.body.appendChild(this.div);
        this.div.style.transform = "translate("+this.posX+"px,"+this.posY+"px)";
    }

    public collision() {
        if (this.game.player.posX                           < this.posX + this.width && 
            this.game.player.posX + this.game.player.width  > this.posX &&
            this.game.player.posY                           < this.posY + this.height &&
            this.game.player.height + this.game.player.posY > this.posY) {
                return true;
        } else {
            return false;
        }
    }

    public remove() {
        this.div.remove();
    }
}