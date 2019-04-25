import { UMI } from '../Logic/UMI.js';
var PlayerDataController = (function () {
    function PlayerDataController() {
        this.UP = 38;
        this.DOWN = 40;
        this.LEFT = 37;
        this.RIGHT = 39;
        this.CHAR_UP = 87;
        this.CHAR_DOWN = 83;
        this.CHAR_LEFT = 65;
        this.CHAR_RIGHT = 68;
        this.E = 69;
        this.F = 70;
        this.SPACE = 32;
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        this.nega_up = false;
        this.nega_down = false;
        this.nega_left = false;
        this.nega_right = false;
        this.hab1 = false;
        this.hab2 = false;
        this.hab3 = false;
        this.hab4 = false;
        this.fixedPoint = [0, 0];
        this.ca = 0;
        this.clicked = false;
        this.distance = 0;
        this.MainPlayer = false;
    }
    PlayerDataController.prototype.playingKeyDown = function (kCode) {
        switch (kCode) {
            case (this.UP):
            case (this.CHAR_UP):
                this.up = true;
                this.nega_up = false;
                this.nega_down = true;
                break;
            case (this.DOWN):
            case (this.CHAR_DOWN):
                this.down = true;
                this.nega_down = false;
                this.nega_up = true;
                break;
            case (this.LEFT):
            case (this.CHAR_LEFT):
                this.left = true;
                this.nega_left = false;
                this.nega_right = true;
                break;
            case (this.RIGHT):
            case (this.CHAR_RIGHT):
                this.right = true;
                this.nega_right = false;
                this.nega_left = true;
                break;
            case (this.SPACE):
                this.hab2 = true;
                break;
            case (this.F):
                this.hab3 = true;
                break;
            case (this.E):
                this.hab4 = true;
                break;
        }
    };
    PlayerDataController.prototype.playingKeyUp = function (kCode) {
        switch (true) {
            case (kCode == this.UP || kCode == this.CHAR_UP):
                this.up = false;
                this.nega_down = false;
                break;
            case (kCode == this.DOWN || kCode == this.CHAR_DOWN):
                this.down = false;
                this.nega_up = false;
                break;
            case (kCode == this.LEFT || kCode == this.CHAR_LEFT):
                this.left = false;
                this.nega_right = false;
                break;
            case (kCode == this.RIGHT || kCode == this.CHAR_RIGHT):
                this.right = false;
                this.nega_left = false;
                break;
        }
    };
    PlayerDataController.prototype.getCA = function () {
        return this.ca;
    };
    PlayerDataController.prototype.setMousePosition = function (x, y, pjx, pjy, ca, fx) {
        this.cx = x;
        this.cy = y;
        this.ca = ca;
        this.fixedPoint = fx;
    };
    PlayerDataController.prototype.playingMouseMove = function (e, rect) {
        this.cx = UMI.getUMI(e.clientX - rect.left);
        this.cy = UMI.getUMI(e.clientY - rect.top);
    };
    PlayerDataController.prototype.getCX = function () {
        return this.cx;
    };
    PlayerDataController.prototype.getCY = function () {
        return this.cy;
    };
    PlayerDataController.prototype.clickOn = function () {
        return this.clicked;
    };
    PlayerDataController.prototype.playingMouseDown = function () {
        this.clicked = true;
    };
    PlayerDataController.prototype.playingRigthMouseDown = function () {
        this.hab1 = true;
    };
    PlayerDataController.prototype.playingMouseUp = function () {
        this.clicked = false;
    };
    return PlayerDataController;
}());
export { PlayerDataController };
