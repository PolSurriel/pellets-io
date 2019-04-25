import { UMI } from "../../Logic/UMI.js";
import { Sound } from "../../Element/Sound.js";
export class Blind {
    constructor() {
        this.blinding = false;
        this.blindSpeed = UMI.getSpeed(20);
        this.currentblindSpeed = UMI.getSpeed(20);
        this.blindRadio = 0;
        this.blindOpacity = 0.8;
        this.blindContraction = false;
        this.blind = false;
        this.sound = new Sound("../js/sounds/blind.wav");
    }
    do() {
        this.sound.stop();
        this.sound.play();
        this.blinding = true;
        return true;
    }
    doing() {
        return this.blinding;
    }
    getBlind() {
        return this.blind;
    }
    updateStatus(obj) {
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
    }
    blindOff() {
        this.blind = false;
    }
    draw(ctx, x, y) {
        ctx.fillStyle = 'rgba(' + this.blindRadio + ', ' + this.blindRadio / 2 + ', ' + this.blindRadio / 2 + ', 0.5)';
        ctx.beginPath();
        ctx.arc(UMI.getPX(x), UMI.getPX(y), UMI.getPX(this.blindRadio), 0, 2 * Math.PI);
        ctx.fill();
    }
    drawBlind(ctxFG, w, h) {
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
    }
}
