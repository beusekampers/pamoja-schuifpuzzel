var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Character = (function () {
    function Character(x, y) {
        this.speed = 10;
        this.animationDone = false;
        this.posX = x;
        this.posY = y;
        this.div = document.createElement("character");
        this.div.style.width = "80px";
        this.div.style.height = "80px";
        this.div.style.transform = "translate(" + this.posX + "px," + this.posY + "px)";
        this.div.style.backgroundImage = "url(images/character-2.png)";
        document.body.appendChild(this.div);
    }
    Character.prototype.move = function () {
        this.posX += this.speed;
        this.div.style.transform = "translate(" + this.posX + "px," + this.posY + "px)";
        if (this.posX == 520) {
            this.speed = 0;
            this.animationDone = true;
        }
    };
    return Character;
}());
var Game = (function () {
    function Game() {
        this.coinCount = 0;
        this.gameFinished = false;
        this.player = new Player(100, 100);
        this.door = new Door(580, 200);
        this.finish = new Finish();
        this.character = new Character(210, 210);
        this.furniture = new Array();
        this.furniture.push(new Sofa(2, "hor", 300, 400, this));
        this.furniture.push(new Sofa(1, "hor", 0, 200, this));
        this.furniture.push(new Table(1, "vert", 300, 100, this));
        this.furniture.push(new Table(1, "vert", 400, 200, this));
        this.coinCounter = document.createElement("coinCounter");
        document.body.appendChild(this.coinCounter);
        this.coinCounter.innerHTML = "Munten: " + this.coinCount + "/3";
        this.coins = new Array();
        this.coins.push(new Coin(325, 25, this));
        this.coins.push(new Coin(25, 225, this));
        this.coins.push(new Coin(325, 425, this));
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    Game.prototype.gameLoop = function () {
        this.player.move();
        this.finishCounter();
        for (var _i = 0, _a = this.coins; _i < _a.length; _i++) {
            var c = _a[_i];
            if (c.collision()) {
                this.updateCoinCount();
                this.coins.splice(this.coins.indexOf(c), 1);
                c.remove();
                c = undefined;
                console.log(this.coins);
            }
            else {
            }
        }
        for (var _b = 0, _c = this.furniture; _b < _c.length; _b++) {
            var f = _c[_b];
            f.move();
            f.collision();
        }
        if (this.furniture.every(this.finishChecker)) {
            this.character.move();
            if (this.character.animationDone) {
                this.player.removePlayer();
                this.player = undefined;
                if (this.end == null) {
                    this.end = new End();
                }
                else {
                }
            }
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
                f.touchingFinish = false;
            }
            else {
                f.touchingFinish = true;
            }
        }
    };
    Game.prototype.finishChecker = function (el) {
        if (el.touchingFinish) {
            return true;
        }
        else {
            return false;
        }
    };
    Game.prototype.updateCoinCount = function () {
        this.coinCount++;
        this.coinCounter.innerHTML = "Munten: " + this.coinCount + "/3";
    };
    return Game;
}());
var Coin = (function () {
    function Coin(x, y, g) {
        this.width = 50;
        this.height = 50;
        this.game = g;
        this.posX = x;
        this.posY = y;
        this.div = document.createElement("coin");
        document.body.appendChild(this.div);
        this.div.style.transform = "translate(" + this.posX + "px," + this.posY + "px)";
    }
    Coin.prototype.collision = function () {
        if (this.game.player.posX < this.posX + this.width &&
            this.game.player.posX + this.game.player.width > this.posX &&
            this.game.player.posY < this.posY + this.height &&
            this.game.player.height + this.game.player.posY > this.posY) {
            return true;
        }
        else {
            return false;
        }
    };
    Coin.prototype.remove = function () {
        this.div.remove();
    };
    return Coin;
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
var End = (function () {
    function End() {
        this.div = document.createElement("endScreen");
        document.body.appendChild(this.div);
        this.title = document.createElement("title");
        this.title.innerHTML = "De weg naar de deur is vrij!";
        this.div.appendChild(this.title);
        this.info = document.createElement("info");
        this.info.innerHTML = "Pip heeft de weg naar de deur voor jou vrij gemaakt, je bent weer een stapje dichter bij Pamoja World!";
        this.div.appendChild(this.info);
    }
    return End;
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
    return Finish;
}());
var Furniture = (function () {
    function Furniture(size, orientation, x, y, g) {
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
        this.game = g;
        this.size = size;
        this.orientation = orientation;
        this.div = document.createElement("block");
        if (this.orientation == "hor") {
            this.div.classList.add("hor");
            if (this.size == 1) {
                this.width = 200;
                this.div.style.width = "200px";
            }
            else if (this.size == 2) {
                this.width = 300;
                this.div.style.width = "300px";
            }
            this.height = 100;
            this.div.style.height = "100px";
        }
        if (this.orientation == "vert") {
            this.div.classList.add("vert");
            if (this.size == 1) {
                this.height = 200;
                this.div.style.height = "200px";
            }
            else if (this.size == 2) {
                this.height = 300;
                this.div.style.height = "300px";
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
    Furniture.prototype.move = function () {
        if (this.posY <= 0) {
            this.upSpeed = 0;
        }
        else {
            this.upSpeed = 100;
        }
        if (this.posY + (this.height - 100) >= 500) {
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
        if (this.posX + (this.width - 100) > 400) {
            this.rightSpeed = 0;
        }
        else {
            this.rightSpeed = 100;
        }
    };
    Furniture.prototype.collision = function () {
        if (this.game.player.posX < this.posX + this.width &&
            this.game.player.posX + this.game.player.width > this.posX &&
            this.game.player.posY < this.posY + this.height &&
            this.game.player.height + this.game.player.posY > this.posY) {
            if (this.leftHit) {
                this.posX += this.rightSpeed;
                this.div.style.left = this.posX + "px";
            }
            if (this.rightHit) {
                this.posX -= this.leftSpeed;
                this.div.style.left = this.posX + "px";
            }
            if (this.bottomHit) {
                this.posY -= this.upSpeed;
                this.div.style.top = this.posY + "px";
            }
            if (this.topHit) {
                this.posY += this.downSpeed;
                this.div.style.top = this.posY + "px";
            }
        }
        if (this.game.player.posX + this.game.player.width == this.posX) {
            this.leftHit = true;
        }
        else {
            this.leftHit = false;
        }
        if (this.game.player.posX == this.posX + this.width) {
            this.rightHit = true;
        }
        else {
            this.rightHit = false;
        }
        if (this.game.player.posY == this.posY + this.height) {
            this.bottomHit = true;
        }
        else {
            this.bottomHit = false;
        }
        if (this.game.player.posY + this.game.player.height == this.posY) {
            this.topHit = true;
        }
        else {
            this.topHit = false;
        }
    };
    return Furniture;
}());
window.addEventListener("load", function () {
    var start = new Start();
    document.getElementById('startButton').onclick = function () {
        start.remove();
        new Game();
    };
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
            case 38:
                this.upSpeed = 10;
                this.player.style.backgroundPositionX = "-" + this.width + "px";
                break;
            case this.downKey:
            case 40:
                this.downSpeed = 10;
                this.player.style.backgroundPositionX = "-" + this.width * 3 + "px";
                break;
            case this.leftKey:
            case 37:
                this.leftSpeed = 10;
                this.player.style.backgroundPositionX = "-" + this.width * 2 + "px";
                break;
            case this.rightKey:
            case 39:
                this.rightSpeed = 10;
                this.player.style.backgroundPositionX = "0px";
                break;
        }
    };
    Player.prototype.onKeyUp = function (event) {
        this.upSpeed = this.downSpeed = this.leftSpeed = this.rightSpeed = 0;
    };
    Player.prototype.removePlayer = function () {
        this.player.remove();
    };
    return Player;
}());
var Sofa = (function (_super) {
    __extends(Sofa, _super);
    function Sofa(size, orientation, x, y, g) {
        var _this = _super.call(this, size, orientation, x, y, g) || this;
        _this.orientationPass = orientation;
        _this.sizePass = size;
        if (_this.sizePass == 1) {
            if (_this.orientationPass == "vert") {
                _this.div.style.backgroundImage = "url(images/sofa-vert.png)";
            }
            else {
                _this.div.style.backgroundImage = "url(images/sofa.png)";
            }
        }
        else {
            if (_this.orientationPass == "vert") {
                _this.div.style.backgroundImage = "url(images/sofa-big-vert.png)";
            }
            else {
                _this.div.style.backgroundImage = "url(images/sofa-big.png)";
            }
        }
        return _this;
    }
    return Sofa;
}(Furniture));
var Start = (function () {
    function Start() {
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
    Start.prototype.remove = function () {
        this.title.remove();
        this.title = undefined;
        this.button.remove();
        this.button = undefined;
        this.div.remove();
        this.div = undefined;
    };
    return Start;
}());
var Table = (function (_super) {
    __extends(Table, _super);
    function Table(size, orientation, x, y, g) {
        var _this = _super.call(this, size, orientation, x, y, g) || this;
        _this.orientationPass = orientation;
        _this.sizePass = size;
        if (_this.sizePass == 1) {
            if (_this.orientationPass == "vert") {
                _this.div.style.backgroundImage = "url(images/table-vert.png)";
            }
            else {
                _this.div.style.backgroundImage = "url(images/table.png)";
            }
        }
        else {
            if (_this.orientationPass == "vert") {
                _this.div.style.backgroundImage = "url(images/table-big-vert.png)";
            }
            else {
                _this.div.style.backgroundImage = "url(images/table-big.png)";
            }
        }
        return _this;
    }
    return Table;
}(Furniture));
//# sourceMappingURL=main.js.map