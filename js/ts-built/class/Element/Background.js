import { UMI } from '../Logic/UMI.js';
var DefaultBackground = /** @class */ (function () {
    function DefaultBackground(init_x, init_y, finale_x, finale_y) {
        this.primary_color = "#BCBBBD";
        this.lines_color = "";
        this.init_x = init_x;
        this.init_y = init_y;
        this.finale_x = finale_x;
        this.finale_y = finale_y;
    }
    DefaultBackground.prototype.draw = function (ctx) {
        ctx.fillstyle = this.primary_color;
        ctx.rect(UMI.getPX(this.init_x), UMI.getPX(this.init_y), UMI.getPX(this.finale_x), UMI.getPX(this.finale_y));
        ctx.fill();
    };
    return DefaultBackground;
}());
export { DefaultBackground };
