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
import { ViewField } from './ViewField.js';
import { Circle } from './Element/Circle.js';
var Pellet = /** @class */ (function (_super) {
    __extends(Pellet, _super);
    function Pellet(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.viewField = new ViewField();
        return _this;
    }
    Pellet.prototype.checkColision = function () {
        return true;
    };
    return Pellet;
}(Circle));
export { Pellet };
