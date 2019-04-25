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
import { GameElement } from './GameElement.js';
import { UMI } from './../Logic/UMI.js';
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect(x, y, width, height, color, img) {
        var _this = _super.call(this, x, y) || this;
        _this.width = width;
        _this.height = height;
        _this.centerX = width / 2;
        _this.centerY = height / 2;
        _this.color = color;
        return _this;
    }
    Rect.prototype.draw = function (ctx) {
        ctx.strokeStyke = this.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.rect(UMI.screenX(this.getX()), UMI.screenY(this.getY()), UMI.getPX(this.width), UMI.getPX(this.height));
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    };
    Rect.prototype.getWidth = function () {
        return this.width;
    };
    Rect.prototype.getHeight = function () {
        return this.height;
    };
    Rect.prototype.getPoints = function () {
        return [
            [this.getX(), this.getY()],
            [this.getX() + this.width, this.getY()],
            [this.getX(), this.getY() + this.getHeight()],
            [this.getX() + this.width, this.getY() + this.getHeight()]
        ];
    };
    Rect.prototype.getMaxX = function () {
        return this.getX() + this.width;
    };
    Rect.prototype.getMinX = function () {
        return this.getX();
    };
    Rect.prototype.getMaxY = function () {
        return this.getY() + this.height;
    };
    Rect.prototype.getMinY = function () {
        return this.getY();
    };
    return Rect;
}(GameElement));
export { Rect };
