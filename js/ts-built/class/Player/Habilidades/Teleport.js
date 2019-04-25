import { UMI } from "../../Logic/UMI.js";
import { PHY } from "../../Logic/PHY.js";
import { Sound } from "../../Element/Sound.js";
export class Teleport {
    constructor() {
        this.teleporting = false;
        this.teleportStatus = 0;
        this.teleportSpeed = UMI.getSpeed(1);
        this.radioOrigin = 25;
        this.minusRadioSpeed = UMI.getSpeed(2);
        this.teleported = false;
        this.sound = new Sound("../js/sounds/teleport.wav", 1, 0.5);
    }
    do() {
        this.sound.stop();
        this.sound.play();
        this.teleporting = true;
        this.teleportDestination;
        return true;
    }
    doing() {
        return this.teleporting;
    }
    draw(ctx) { }
    updateStatus(obj) {
        var fx = obj.getFX();
        this.teleportStatus += this.teleportSpeed;
        if (this.teleportStatus < 10) {
            obj.setRadio(obj.getRadio() - this.minusRadioSpeed);
            if (obj.viewField !== null)
                obj.viewField.setCurrentAngle(obj.viewField.getCurrentAngle() - (this.minusRadioSpeed / 50));
        }
        else if (this.teleportStatus < 20) {
            if (!this.teleported) {
                if (PHY.getDistanceBetween(obj.getX(), obj.getY(), fx.fixedPoint[0], fx.fixedPoint[1]) <
                    PHY.getDistanceBetween(obj.getX(), obj.getY(), fx.cx, fx.cy)) {
                    obj.setX(fx.fixedPoint[0]);
                    obj.setY(fx.fixedPoint[1]);
                }
                else {
                    var point = PHY.createRectWithAngle([obj.getX(), obj.getY()], PHY.getDistanceBetween(obj.getX(), obj.getY(), fx.cx, fx.cy) - 45, -fx.ca);
                    obj.setX(point[0]);
                    obj.setY(point[1]);
                }
                this.teleported = true;
            }
            if (obj.getRadio() >= this.radioOrigin)
                obj.setRadio(this.radioOrigin);
            else
                obj.setRadio(obj.getRadio() + this.minusRadioSpeed);
            if (obj.viewField !== null)
                obj.viewField.setCurrentAngle(obj.viewField.getCurrentAngle());
        }
        else {
            this.teleported = false;
            this.teleporting = false;
            this.teleportStatus = 0;
        }
    }
}
Teleport.teleportDistance = 630;
