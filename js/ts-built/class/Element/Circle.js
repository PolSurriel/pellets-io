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
import { UMI } from '../Logic/UMI.js';
import { PHY } from '../Logic/PHY.js';
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(x, y, radio, color, img) {
        var _this = _super.call(this, x, y) || this;
        _this.eAngle = 2 * Math.PI;
        _this.radio = radio;
        _this.color = color;
        if (_this.color !== null) {
            _this.drawShape = function (ctx) {
                ctx.lineWidth = 10;
                ctx.strokeStyle = this.color;
                ctx.beginPath();
                ctx.stroke();
                ctx.arc(UMI.screenX(this.getX()), UMI.screenY(this.getY()), UMI.getPX(this.radio), 0, this.eAngle);
                ctx.fillStyle = this.color;
                ctx.fill();
            };
        }
        else {
            _this.img = img;
            _this.drawShape = function (ctx) {
                ctx.drawImage(this.img, this.getX, this.getY);
            };
        }
        return _this;
    }
    Circle.prototype.getRadio = function () {
        return this.radio;
    };
    Circle.prototype.getCenterX = function () {
        return this.getX() + (this.radio / 2);
    };
    Circle.prototype.getCenterY = function () {
        return this.getY() + (this.radio / 2);
    };
    Circle.prototype.setRadio = function (r) {
        this.radio = r;
    };
    Circle.prototype.draw = function (ctx) {
        this.drawShape(ctx);
    };
    Circle.colision = function (obj, x, y, radio) {
        return PHY.getDistanceBetween(x, y, obj.getX(), obj.getY()) - radio < radio;
    };
    return Circle;
}(GameElement));
export { Circle };
