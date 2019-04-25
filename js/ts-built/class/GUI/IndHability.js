import { Sound } from '../Element/Sound.js';
var IndHability = (function () {
    function IndHability() {
    }
    IndHability.getCount = function () {
        return this.count;
    };
    IndHability.getRestablishCount = function () {
        return this.restablishCount;
    };
    IndHability.setCount = function (count, restablishCount) {
        if (count > this.count) {
            this.sound.stop();
            this.sound.play();
        }
        this.count = count;
        this.restablishCount = restablishCount;
    };
    IndHability.draw = function (ctx) {
        ctx.fillStyle = this.COLOR;
        ctx.strokeStyle = '#c7ccd6';
        for (var i = 0; i < this.count; i++)
            this.drawOne(ctx, i, 100);
        if (this.restablishCount != 0)
            this.drawOne(ctx, this.count, this.restablishCount / 10);
        else
            this.drawOne(ctx, this.count - 1, 100);
        ctx.beginPath();
        ctx.closePath();
    };
    IndHability.drawOne = function (ctx, n, prc) {
        var spaceBetween = n * this.spaceBetween;
        this.xDrawable = innerWidth - 80;
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(this.xDrawable + spaceBetween, this.yDrawable);
        ctx.lineTo(this.xDrawable + this.width + spaceBetween, this.yDrawable);
        ctx.lineTo((this.xDrawable + (this.width - (prc * this.width / 100)) + spaceBetween), this.yDrawable - (prc * this.height / 100));
        ctx.lineTo((this.xDrawable - (prc * this.width / 100) + spaceBetween), this.yDrawable - (prc * this.height / 100));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    };
    IndHability.COLOR = "rgba(11, 198, 46, 0.75)";
    IndHability.xDrawable = 1900;
    IndHability.yDrawable = 50;
    IndHability.spaceBetween = 20;
    IndHability.width = 12;
    IndHability.height = 35;
    IndHability.count = 0;
    IndHability.restablishCount = 0;
    IndHability.sound = new Sound('../js/sounds/bonus1.wav', 0.1);
    return IndHability;
}());
export { IndHability };
