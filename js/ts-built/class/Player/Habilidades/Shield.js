import { UMI } from "../../Logic/UMI.js";
import { PHY } from "../../Logic/PHY.js";
import { Sound } from "../../Element/Sound.js";
export class Shield {
    constructor() {
        this.shield = false;
        this.shieldLive = 100;
        this.shieldDamage = 0;
        this.shieldMinus = UMI.getSpeed(2);
        this.shieldCont = 0;
        this.shieldSpeed = UMI.getSpeed(2);
        this.shieldGrade = 0;
        this.shieldInc = 0;
        this.shieldFinalInc = 1.3;
        this.countdownSound = new Sound("../js/sounds/countdown.wav");
        this.shieldSound = new Sound("../js/sounds/shield.wav");
    }
    do() {
        var notDoing = !this.shield;
        if (notDoing) {
            this.shieldSound.stop();
            this.shieldSound.play();
            this.countdownSound.stop();
            this.countdownSound.play();
            this.shield = true;
            this.shieldGrade = Math.random() * 359;
        }
        return notDoing;
    }
    doing() {
        return this.shield;
    }
    updateStatus(obj) {
        if (this.shieldCont < 2340) {
            this.shieldCont += this.shieldSpeed;
            this.shieldGrade = PHY.plusAngles(this.shieldGrade, this.shieldSpeed);
            if (this.shieldCont > 2260) {
                this.shieldInc -= this.shieldSpeed / 60;
            }
            else if (this.shieldInc < this.shieldFinalInc) {
                this.shieldInc += this.shieldSpeed / 60;
            }
        }
        else {
            this.shieldCont = 0;
            this.shield = false;
        }
    }
    draw(ctx, x, y) {
        var radians = (this.shieldGrade / 57.2957795);
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(UMI.getPX(x), UMI.getPX(y), UMI.getPX(150), 0 + radians, this.shieldInc + radians);
        ctx.stroke();
    }
}
