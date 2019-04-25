import { UserEvents } from './../Player/UserEvents.js';
import { UMI } from './../Logic/UMI.js';
var Cursor = (function () {
    function Cursor() {
    }
    Cursor.draw = function (ctx) {
        ctx.globalCompositeOperation = 'lighter';
        ctx.lineWidth = this.BORDER_RADIOUS;
        ctx.strokeStyle = this.LINE_COLOR;
        ctx.beginPath();
        ctx.stroke();
        ctx.arc(UMI.getPX(UserEvents.getCX()), UMI.getPX(UserEvents.getCY()), UMI.getPX(this.RADIO), 0, this.EANGLE);
        ctx.fillStyle = this.COLOR;
        ctx.fill();
        ctx.stroke();
        ctx.globalCompositeOperation = 'source-over';
    };
    Cursor.COLOR = "rgba(84, 216, 181, 0.5)";
    Cursor.LINE_COLOR = "rgb(147, 147, 147)";
    Cursor.RADIO = 17;
    Cursor.BORDER_RADIOUS = 3;
    Cursor.EANGLE = 2 * Math.PI;
    return Cursor;
}());
export { Cursor };
