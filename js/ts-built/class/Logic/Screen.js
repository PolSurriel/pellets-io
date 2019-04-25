import { UMI } from "./UMI.js";
var Screen = (function () {
    function Screen(objReference, fixed) {
        this.x = 1800;
        this.width = 1800;
        this.minx = 200;
        this.miny = 150;
        this.y = 500;
        this.fixed = false;
        this.regRefX = 0;
        this.regRefY = 0;
        this.objReference = objReference;
        this.last_x = objReference.getX();
        this.last_y = objReference.getY();
        if (fixed) {
            this.x = objReference.getX();
            this.y = objReference.getY();
            this.minx = objReference.getX();
            this.miny = objReference.getY();
            this.regRefX = UMI.getUMIsWidth() / 2 - this.objReference.getX();
            this.regRefY = UMI.getUMIsHeight() / 2 - this.objReference.getY();
            this.fixed = true;
        }
    }
    Screen.prototype.centerObjReference = function () {
        if (this.fixed) {
            this.x = this.objReference.getX();
            this.y = this.objReference.getY();
            this.minx = this.objReference.getX();
            this.miny = this.objReference.getY();
            this.regRefX = UMI.getUMIsWidth() / 2 - this.objReference.getX();
            this.regRefY = UMI.getUMIsHeight() / 2 - this.objReference.getY();
        }
    };
    Screen.prototype.setObjReference = function (obj) {
        this.objReference = obj;
    };
    Screen.prototype.follow = function () {
    };
    Screen.prototype.getX = function () {
        if (this.objReference.getX() > this.x)
            return this.x - this.objReference.getX() + this.regRefX;
        else if (this.objReference.getX() < this.minx)
            return -(this.objReference.getX() - this.minx) + this.regRefX;
        else
            return 0 + this.regRefX;
    };
    Screen.prototype.getY = function () {
        if (this.objReference.getY() > this.y)
            return this.y - this.objReference.getY() + this.regRefY;
        else if (this.objReference.getY() < this.miny)
            return -(this.objReference.getY() - this.miny) + this.regRefY;
        else
            return 0 + this.regRefY;
    };
    Screen.prototype.refX = function () {
        if (this.objReference.getX() > this.x)
            return this.x + this.regRefX;
        else if (this.objReference.getX() < this.minx)
            return this.minx + this.regRefX;
        else
            return this.objReference.getX() + this.regRefX;
    };
    Screen.prototype.refY = function () {
        if (this.objReference.getY() > this.y)
            return this.y + this.regRefY;
        else if (this.objReference.getY() < this.miny)
            return this.miny + this.regRefY;
        else
            return this.objReference.getY() + this.regRefY;
    };
    Screen.prototype.reverseRefY = function () {
        if (this.objReference.getY() > this.y || this.objReference.getY() < this.miny)
            return -this.objReference.getY() + this.regRefY;
        else
            return 0 + this.regRefY;
    };
    Screen.prototype.reverseRefX = function () {
        if (this.objReference.getX() > this.x || this.objReference.getX() < this.minx)
            return -this.objReference.getX() + this.regRefY;
        else
            return 0 + this.regRefY;
    };
    return Screen;
}());
export { Screen };
