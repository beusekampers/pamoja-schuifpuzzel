var Block = (function () {
    function Block(size, furn, orientation, x, y) {
        this.upSpeed = 0;
        this.downSpeed = 0;
        this.leftSpeed = 0;
        this.rightSpeed = 0;
        this.topHit = false;
        this.leftHit = false;
        this.rightHit = false;
        this.bottomHit = false;
        this.topFurnitureHit = false;
        this.leftFurnitureHit = false;
        this.rightFurnitureHit = false;
        this.bottomFurnitureHit = false;
        this.furn = furn;
        this.size = size;
        this.orientation = orientation;
        this.div = document.createElement("block");
        if (this.orientation == "hor") {
            this.div.classList.add("hor");
            if (this.size == 1) {
                this.width = 200;
                this.div.style.width = "200px";
                this.div.style.backgroundImage = "url(images/hor-furn.png)";
                if (furn == "bed") {
                    this.div.style.backgroundPosition = "0 0";
                }
                else if (furn == "couch") {
                    this.div.style.backgroundPosition = "0 -100px";
                }
                else if (furn == "table") {
                    this.div.style.backgroundPosition = "0 -200px";
                }
            }
            else if (this.size == 2) {
                this.width = 300;
                this.div.style.width = "300px";
                this.div.style.backgroundImage = "url(images/hor-furn-big.png)";
                if (furn == "bed") {
                    this.div.style.backgroundPosition = "0 0";
                }
                else if (furn == "couch") {
                    this.div.style.backgroundPosition = "0 -100px";
                }
                else if (furn == "table") {
                    this.div.style.backgroundPosition = "0 -200px";
                }
            }
            this.height = 100;
            this.div.style.height = "100px";
        }
        if (this.orientation == "vert") {
            this.div.classList.add("vert");
            if (this.size == 1) {
                this.height = 200;
                this.div.style.height = "200px";
                this.div.style.backgroundImage = "url(images/vert-furn.png)";
                if (furn == "bed") {
                    this.div.style.backgroundPosition = "0 0";
                }
                else if (furn == "couch") {
                    this.div.style.backgroundPosition = "-100px 0";
                }
                else if (furn == "table") {
                    this.div.style.backgroundPosition = "-200px 0";
                }
            }
            else if (this.size == 2) {
                this.height = 300;
                this.div.style.height = "300px";
                this.div.style.backgroundImage = "url(images/vert-furn-big.png)";
                if (furn == "bed") {
                    this.div.style.backgroundPosition = "0 0";
                }
                else if (furn == "couch") {
                    this.div.style.backgroundPosition = "-100px 0";
                }
                else if (furn == "table") {
                    this.div.style.backgroundPosition = "-200px 0";
                }
            }
            this.width = 100;
            this.div.style.width = "100px";
        }
        this.posX = x;
        this.posY = y;
        this.div.style.left = x + "px";
        this.div.style.top = y + "px";
        document.body.appendChild(this.div);
    }
    Block.prototype.move = function () {
        if (this.posY <= 0) {
            this.upSpeed = 0;
        }
        else {
            this.upSpeed = 100;
        }
        if (this.posY >= 500) {
            this.downSpeed = 0;
        }
        else {
            this.downSpeed = 100;
        }
        if (this.posX < 100) {
            this.leftSpeed = 0;
        }
        else {
            this.leftSpeed = 100;
        }
        if (this.posX + this.width / 2 > 400) {
            this.rightSpeed = 0;
        }
        else {
            this.rightSpeed = 100;
        }
    };
    return Block;
}());
var Character = (function () {
    function Character() {
        this.div = document.createElement("character");
        this.div.style.width = "80px";
        this.div.style.height = "80px";
        this.div.style.top = "210px";
        this.div.style.left = "210px";
        this.div.style.backgroundImage = "url(images/character-2.png)";
        document.body.appendChild(this.div);
    }
    return Character;
}());
var Door = (function () {
    function Door(x, y) {
        this.posX = x;
        this.posY = y;
        this.div = document.createElement("door");
        document.body.appendChild(this.div);
        this.div.style.transform = "translate(" + this.posX + "px," + this.posY + "px)";
    }
    return Door;
}());
var Finish = (function () {
    function Finish() {
        this.width = 280;
        this.height = 80;
        this.posX = 320;
        this.posY = 210;
        this.div = document.createElement("finish");
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        this.div.style.top = this.posY + "px";
        this.div.style.left = this.posX + "px";
        this.div.style.backgroundImage = "url(images/direction.png)";
        document.body.appendChild(this.div);
    }
    Finish.prototype.move = function () {
    };
    return Finish;
}());
var Game = (function () {
    function Game() {
        this.gameFinished = false;
        this.finishCount = 0;
        this.player = new Player(100, 100);
        this.door = new Door(580, 200);
        this.finish = new Finish();
        this.character = new Character();
        this.furniture = new Array();
        this.furniture.push(new Block(2, "couch", "hor", 300, 400));
        this.furniture.push(new Block(1, "bed", "hor", 0, 200));
        this.furniture.push(new Block(1, "table", "vert", 300, 100));
        this.furniture.push(new Block(1, "table", "vert", 400, 200));
        this.grid = new Array(6);
        this.finishCounter();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    Game.prototype.gameLoop = function () {
        this.player.move();
        for (var _i = 0, _a = this.furniture; _i < _a.length; _i++) {
            var f = _a[_i];
            f.move();
            if (this.player.posX < f.posX + f.width &&
                this.player.posX + this.player.width > f.posX &&
                this.player.posY < f.posY + f.height &&
                this.player.height + this.player.posY > f.posY) {
                if (f.leftHit) {
                    f.posX += f.rightSpeed;
                    f.div.style.left = f.posX + "px";
                }
                if (f.rightHit) {
                    f.posX -= f.leftSpeed;
                    f.div.style.left = f.posX + "px";
                }
                if (f.bottomHit) {
                    f.posY -= f.upSpeed;
                    f.div.style.top = f.posY + "px";
                }
                if (f.topHit) {
                    f.posY += f.downSpeed;
                    f.div.style.top = f.posY + "px";
                }
            }
            if (this.player.posX + this.player.width == f.posX) {
                f.leftHit = true;
            }
            else {
                f.leftHit = false;
            }
            if (this.player.posX == f.posX + f.width) {
                f.rightHit = true;
            }
            else {
                f.rightHit = false;
            }
            if (this.player.posY == f.posY + f.height) {
                f.bottomHit = true;
            }
            else {
                f.bottomHit = false;
            }
            if (this.player.posY + this.player.height == f.posY) {
                f.topHit = true;
            }
            else {
                f.topHit = false;
            }
        }
        if (this.allTrue(this.furniture)) {
            console.log("GAME UITGESPEELD!");
        }
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    Game.prototype.finishCounter = function () {
        for (var _i = 0, _a = this.furniture; _i < _a.length; _i++) {
            var f = _a[_i];
            if (f.posX < this.finish.posX + this.finish.width &&
                f.posX + f.width > this.finish.posX &&
                f.posY < this.finish.posY + this.finish.height &&
                f.height + f.posY > this.finish.posY) {
                f.touchingFinish = true;
            }
            else {
                f.touchingFinish = false;
            }
        }
    };
    Game.prototype.checkFinish = function (el, index) {
        return el.touchingFinish;
    };
    Game.prototype.allTrue = function (obj) {
        for (var o in obj) {
            if (!obj[o].touchingFinish) {
                return true;
            }
        }
        return false;
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
var Player = (function () {
    function Player(x, y) {
        var _this = this;
        this.width = 80;
        this.height = 80;
        this.upKey = 87;
        this.upKeyHitn = false;
        this.upSpeed = 0;
        this.downKey = 83;
        this.downKeyHit = false;
        this.downSpeed = 0;
        this.leftKey = 65;
        this.leftKeyHit = false;
        this.leftSpeed = 0;
        this.rightKey = 68;
        this.rightKeyHit = false;
        this.rightSpeed = 0;
        this.posX = x;
        this.posY = y;
        this.player = document.createElement("player");
        this.player.style.backgroundImage = "url(images/character-sprite.png)";
        this.player.style.backgroundPositionX = "0px";
        document.body.appendChild(this.player);
        this.player.style.transform = "translate(" + this.posX + "px," + this.posY + "px)";
        console.log("X=" + this.posX + " Y=" + this.posY);
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Player.prototype.move = function () {
        if (this.posY < 0) {
            this.upSpeed = 0;
        }
        else {
            this.posY -= this.upSpeed;
            this.player.style.transform = "translate(" + this.posX + "px," + this.posY + "px)";
        }
        if (this.posY > 520) {
            this.downSpeed = 0;
        }
        else {
            this.posY += this.downSpeed;
            this.player.style.transform = "translate(" + this.posX + "px," + this.posY + "px)";
        }
        if (this.posX < 0) {
            this.leftSpeed = 0;
        }
        else {
            this.posX -= this.leftSpeed;
            this.player.style.transform = "translate(" + this.posX + "px," + this.posY + "px)";
        }
        if (this.posX > 520) {
            this.rightSpeed = 0;
        }
        else {
            this.posX += this.rightSpeed;
            this.player.style.transform = "translate(" + this.posX + "px," + this.posY + "px)";
        }
    };
    Player.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case this.upKey:
                this.upSpeed = 10;
                this.player.style.backgroundPositionX = "-" + this.width + "px";
                break;
            case this.downKey:
                this.downSpeed = 10;
                this.player.style.backgroundPositionX = "-" + this.width * 3 + "px";
                break;
            case this.leftKey:
                this.leftSpeed = 10;
                this.player.style.backgroundPositionX = "-" + this.width * 2 + "px";
                break;
            case this.rightKey:
                this.rightSpeed = 10;
                this.player.style.backgroundPositionX = "0px";
                break;
        }
    };
    Player.prototype.onKeyUp = function (event) {
        this.upSpeed = this.downSpeed = this.leftSpeed = this.rightSpeed = 0;
    };
    return Player;
}());
//# sourceMappingURL=main.js.map