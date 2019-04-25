import { UserEvents } from "../Player/UserEvents.js";
import { UMI } from "../Logic/UMI.js";
import { requestRespawn } from "../EventListeners/Socket.js";
var UI = (function () {
    function UI() {
    }
    UI.action = function (bg, ctxBG, staticElements, ctxFG, canvas) {
        if (UserEvents.wheelDown) {
            UMI.setZoom(5);
            UserEvents.wheelDown = false;
            ctxBG.clearRect(0, 0, canvas.width, canvas.height);
            ctxFG.clearRect(0, 0, canvas.width, canvas.height);
            bg.draw(ctxBG);
            staticElements.forEach(function (element) { element.draw(ctxFG); });
        }
        else if (UserEvents.wheelUp) {
            UMI.setZoom(-5);
            UserEvents.wheelUp = false;
            ctxBG.clearRect(0, 0, canvas.width, canvas.height);
            ctxFG.clearRect(0, 0, canvas.width, canvas.height);
            bg.draw(ctxBG);
            staticElements.forEach(function (element) { element.draw(ctxFG); });
        }
    };
    UI.drawGard = function (ctx, w, h) {
        if (this.deathScreen) {
            var grd = ctx.createRadialGradient(w / 2, h / 2, 100, w / 2, h / 2, 500);
            grd.addColorStop(0, "rgba(255,0,130,0.3)");
            grd.addColorStop(1, "rgba(0,0,0,1)");
            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, w, h);
            ctx.font = "300px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.fillText(this.respawnCountDown, (w / 2), (h / 2) + 100);
        }
        else {
            var grd = ctx.createRadialGradient(w / 2, h / 2, 500, w / 2, h / 2, 1000);
            if (UI.damage > 0)
                grd.addColorStop(0, "rgba(255,0,0," + UI.damage + ")");
            else
                grd.addColorStop(0, "rgba(0,0,0,0)");
            grd.addColorStop(1, "rgba(0,0,0,0.5)");
            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, w, h);
        }
    };
    UI.drawBetaInfo = function (ctx) {
        ctx.textAlign = "start";
        ctx.font = "20px Arial";
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.fillText('BETA', 10, 30);
        ctx.font = "10px Arial";
        ctx.fillText('1.1                         More info:', 65, 30);
        ctx.font = "12px Arial";
        ctx.fillText('www.quantumbitgames.com/news', 10, 42);
    };
    UI.siwtchDeathScreen = function () {
        var _this = this;
        this.deathScreen = !this.deathScreen;
        if (this.deathScreen) {
            this.intervalDeathScreen = setInterval(function () {
                _this.respawnCountDown--;
                if (_this.respawnCountDown <= 0) {
                    requestRespawn();
                    _this.siwtchDeathScreen();
                }
            }, 1000);
        }
        else {
            clearInterval(this.intervalDeathScreen);
            this.respawnCountDown = this.maxRespawnCountDown;
        }
    };
    UI.incDamage = function () {
        if (this.damage < 0.5)
            this.damage += 0.02;
    };
    UI.decDamage = function () {
        if (this.damage > 0)
            this.damage -= 0.004;
        if (this.damage < 0)
            this.damage = 0;
    };
    UI.damage = 0;
    UI.deathScreen = false;
    UI.respawnCountDown = 3;
    UI.maxRespawnCountDown = 3;
    return UI;
}());
export { UI };
