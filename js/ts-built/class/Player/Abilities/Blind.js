import { UMI } from "../../Logic/UMI.js";
import { Sound } from "../../Element/Sound.js";
import { PHY } from "../../Logic/PHY.js";
var Blind = (function () {
    function Blind() {
        this.blinding = false;
        this.blindSpeed = UMI.getSpeed(20);
        this.currentblindSpeed = UMI.getSpeed(20);
        this.blindRadio = 0;
        this.blindOpacity = 0.8;
        this.blindContraction = false;
        this.blind = false;
        this.blindedOpacity = 1;
        this.blinded = false;
        this.sound = new Sound("../js/sounds/blind.wav");
    }
    Blind.prototype.do = function () {
        this.sound.stop();
        this.sound.play();
        this.blinding = true;
        return true;
    };
    Blind.prototype.doing = function () {
        return this.blinding;
    };
    Blind.prototype.setBlinded = function () {
        this.blinded = true;
    };
    Blind.prototype.getBlind = function () {
        return this.blind;
    };
    Blind.prototype.updateStatus = function (obj) {
        if (this.blindRadio < 310) {
            this.blindRadio += this.currentblindSpeed;
            this.currentblindSpeed -= this.blindSpeed / 15;
        }
        else {
            this.blindRadio += this.currentblindSpeed;
            this.currentblindSpeed -= this.blindSpeed / 60;
        }
        if (this.blindRadio < 0) {
            this.blind = true;
            this.blinding = false;
            this.blindRadio = 0;
            this.currentblindSpeed = this.blindSpeed;
        }
    };
    Blind.prototype.blindOff = function () {
        this.blind = false;
    };
    Blind.prototype.draw = function (ctx, x, y) {
        ctx.fillStyle = 'rgba(' + this.blindRadio + ', ' + this.blindRadio / 2 + ', ' + this.blindRadio / 2 + ', 0.5)';
        ctx.strokeStyle = 'rgba(255, 255, 255,0.05)';
        ctx.lineWidth = 1;
        ctx.shadowBlur = 50;
        ctx.shadowColor = 'blue';
        ctx.beginPath();
        ctx.arc(UMI.screenX(x), UMI.screenY(y), UMI.getPX(this.blindRadio), 0, 2 * Math.PI);
        ctx.fill();
        ctx.lineJoin = "round";
        ctx.shadowBlur = 100;
        ctx.strokeStyle = 'rgba(255, 255, 255,0.25)';
        ctx.beginPath();
        ctx.moveTo(UMI.screenX(x), UMI.screenY(y));
        var maxX = UMI.screenX(x) + UMI.getPX(this.blindRadio);
        var minX = UMI.screenX(x) - UMI.getPX(this.blindRadio);
        var maxY = UMI.screenY(y) + UMI.getPX(this.blindRadio);
        var minY = UMI.screenY(y) - UMI.getPX(this.blindRadio);
        for (var index = 0; index < 40; index++) {
            var p = [Math.round(Math.random() * (maxX - minX) + minX), Math.round(Math.random() * (maxY - minY) + minY)];
            if (PHY.getDistanceBetween(p[0], p[1], UMI.screenX(x), UMI.screenY(y)) < UMI.getPX(this.blindRadio))
                ctx.lineTo(p[0], p[1]);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.shadowBlur = 0;
    };
    Blind.prototype.drawBlind = function (ctxFG, w, h) {
        this.blindOpacity -= this.blindSpeed / 1800;
        if (this.blindOpacity > 0) {
            ctxFG.fillStyle = 'rgba(255,255,255,' + this.blindOpacity + ')';
            ctxFG.beginPath();
            ctxFG.rect(0, 0, w, h);
            ctxFG.fill();
        }
        else {
            this.blindOff();
            this.blindOpacity = 0.8;
        }
    };
    Blind.prototype.getBlinded = function () {
        return this.blinded;
    };
    Blind.prototype.drawBlinded = function (ctxFG, w, h) {
        this.blindedOpacity -= this.blindSpeed / 15000;
        if (this.blindedOpacity > 0) {
            ctxFG.fillStyle = 'rgba(255,255,255,' + this.blindedOpacity + ')';
            ctxFG.beginPath();
            ctxFG.rect(0, 0, w, h);
            ctxFG.fill();
        }
        else {
            this.blinded = false;
            this.blindedOpacity = 1;
        }
    };
    return Blind;
}());
export { Blind };
