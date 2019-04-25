import { UMI } from '../Logic/UMI.js';
var DefaultBackground = (function () {
    function DefaultBackground(init_x, init_y, finale_x, finale_y) {
        this.primary_color = "#BCBBBD";
        this.lines_color = "#EFEFEF";
        this.line_width = 10;
        this.line_separation = 80;
        this.init_x = init_x;
        this.init_y = init_y;
        this.finale_x = finale_x;
        this.finale_y = finale_y;
    }
    DefaultBackground.prototype.draw = function (ctxBG) {
        ctxBG.fillStyle = this.primary_color;
        ctxBG.fillRect(UMI.getPX(this.init_x), UMI.getPX(this.init_y), UMI.getPX(this.finale_x), UMI.getPX(this.finale_y));
        ctxBG.fillStyle = this.lines_color;
        ctxBG.globalCompositeOperation = 'multiply';
        var doIt = true;
        var y_relative = UMI.parallaxBackgroundY() % this.line_separation;
        for (var i = UMI.parallaxBackgroundX() % this.line_separation; i < 3000; i += this.line_separation) {
            ctxBG.fillRect(UMI.getPX(i), 0, UMI.getPX(this.line_width), UMI.getPX(this.finale_x));
            ctxBG.fillRect(0, UMI.getPX(y_relative), UMI.getPX(this.finale_y), UMI.getPX(this.line_width));
            y_relative += this.line_separation;
        }
        ctxBG.globalCompositeOperation = 'source-over';
    };
    return DefaultBackground;
}());
export { DefaultBackground };
