var GameElement = (function () {
    function GameElement(x, y) {
        this.x = x;
        this.y = y;
    }
    GameElement.prototype.getX = function () {
        return this.x;
    };
    GameElement.prototype.getY = function () {
        return this.y;
    };
    GameElement.prototype.setX = function (x) {
        this.x = x;
    };
    GameElement.prototype.setY = function (y) {
        this.y = y;
    };
    return GameElement;
}());
export { GameElement };
