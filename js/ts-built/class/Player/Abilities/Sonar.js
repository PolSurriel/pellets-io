import { UMI } from "../../Logic/UMI.js";
import { Sound } from "../../Element/Sound.js";
var Sonar = (function () {
    function Sonar() {
        this.sonarActive = false;
        this.sonarSpeed = UMI.getSpeed(20);
        this.currentSonarSpeed = UMI.getSpeed(20);
        this.sonarRadious = 0;
        this.sonarOpacity = 0.8;
        this.sound = new Sound("../js/sounds/sonar.wav", 0.5);
    }
    Sonar.prototype.do = function () {
        this.sound.stop();
        this.sound.play();
        this.sonarActive = true;
        return true;
    };
    Sonar.prototype.doing = function () {
        return this.sonarActive;
    };
    Sonar.prototype.updateStatus = function (obj) {
        obj.sonarOpacity = this.sonarOpacity;
        this.sonarRadious += this.currentSonarSpeed;
        this.currentSonarSpeed -= this.sonarSpeed / 45;
        this.sonarOpacity -= this.sonarSpeed / 1800;
        if (this.currentSonarSpeed <= 0.5) {
            this.sonarActive = false;
            this.currentSonarSpeed = this.sonarSpeed;
            this.sonarRadious = 0;
            this.sonarOpacity = 0.8;
        }
    };
    Sonar.prototype.draw = function (ctx, x, y) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'rgba(0, 196, 91,' + this.sonarOpacity;
        +')';
        ctx.beginPath();
        ctx.arc(UMI.screenX(x), UMI.screenY(y), UMI.getPX(this.sonarRadious), 0, 2 * Math.PI);
        ctx.stroke();
    };
    return Sonar;
}());
export { Sonar };
