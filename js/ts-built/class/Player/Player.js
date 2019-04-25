import { Pellet } from "./Pellet.js";
import { ViewField } from "./ViewField.js";
import { PHY } from "../Logic/PHY.js";
import { UMI } from "../Logic/UMI.js";
import { Teleport } from "./Abilities/Teleport.js";
import { IndHability } from "../GUI/IndHability.js";
import { Sound } from "../Element/Sound.js";
import { kill } from "../EventListeners/Socket.js";
var Player = (function () {
    function Player(controllerData, x, y, color, img) {
        this.sounds = {
            respawn: new Sound('../js/sounds/respawn.wav', 0.1)
        };
        this.id = 0;
        this.pellet = new Pellet(x, y, color, img);
        if (controllerData.MainPlayer) {
            this.viewField = new ViewField();
            this.pellet.viewField = this.viewField;
        }
        this.controllerData = controllerData;
        this.pellet.setMainPlayer(controllerData.MainPlayer);
    }
    Player.prototype.drawAbilities = function (ctx) {
        this.pellet.drawAbilities(ctx);
    };
    Player.prototype.cleanShadows = function () {
        this.viewField.cleanShadows();
    };
    Player.prototype.colision = function (obj) {
        return this.pellet.colision(obj);
    };
    Player.prototype.sonarActive = function () {
        return this.pellet.sonarActive();
    };
    Player.prototype.getBlind = function () {
        return this.pellet.getBlind();
    };
    Player.prototype.setId = function (id) {
        this.id = id;
    };
    Player.prototype.updateShadow = function (obj) {
        this.viewField.updateViewShadow(obj, this.pellet.getCenterX(), this.pellet.getCenterY());
    };
    Player.prototype.viewShadows = function (ctx) {
        this.viewField.drawShadowShapes(ctx);
    };
    Player.prototype.getId = function () {
        return this.id;
    };
    Player.prototype.action = function () {
        if (this.controllerData.MainPlayer) {
            this.controllerData.ca = Math.atan2(UMI.screenYUMI(this.getY()) - this.controllerData.getCY(), UMI.screenXUMI(this.getX()) - this.controllerData.getCX()) + UMI.RADIANSOF180;
            this.controllerData.fixedPoint = PHY.createRectWithAngle([this.pellet.getX(), this.pellet.getY()], Teleport.teleportDistance, -this.controllerData.ca);
        }
        if (!this.controllerData.MainPlayer || this.controllerData.MainPlayer && !this.controllerData.onChat) {
            this.pellet.action(this.controllerData);
        }
        else {
            this.pellet.littleAction(this.controllerData);
        }
        if (this.controllerData.MainPlayer) {
            this.viewField.setX(this.pellet.getX());
            this.viewField.setY(this.pellet.getY());
            this.viewField.action();
        }
        this.controllerData.hab1 = false;
        this.controllerData.hab2 = false;
        this.controllerData.hab3 = false;
        this.controllerData.hab4 = false;
        if (this.controllerData.MainPlayer)
            IndHability.setCount(this.pellet.getAbilityCount(), this.pellet.getRestablishAbilityCount());
    };
    Player.prototype.getPrevX = function () {
        return this.pellet.getPrevX();
    };
    Player.prototype.getPrevY = function () {
        return this.pellet.getPrevY();
    };
    Player.prototype.draw = function (ctx) {
        if (this.controllerData.MainPlayer && this.pellet.isAlive())
            this.viewField.draw(ctx);
        this.pellet.draw(ctx);
    };
    Player.prototype.teleporting = function () {
        return this.pellet.teleporting();
    };
    Player.prototype.setX = function (x) {
        this.pellet.setX(x);
    };
    Player.prototype.setY = function (y) {
        this.pellet.setY(y);
    };
    Player.prototype.getX = function () {
        return this.pellet.getX();
    };
    Player.prototype.getY = function () {
        return this.pellet.getY();
    };
    Player.prototype.blinded = function () {
        return this.pellet.blinded();
    };
    Player.prototype.setBlinded = function () {
        this.pellet.setBlinded();
    };
    Player.prototype.drawBlind = function (ctxFG, w, h) {
        this.pellet.drawBlind(ctxFG, w, h);
    };
    Player.prototype.drawBlinded = function (ctxFG, w, h) {
        this.pellet.drawBlinded(ctxFG, w, h);
    };
    Player.prototype.colisionReact = function (obj) {
        this.pellet.colisionReact(obj);
    };
    Player.prototype.inShield = function () {
        return this.pellet.inShield();
    };
    Player.prototype.getRadio = function () {
        return this.pellet.getRadio();
    };
    Player.prototype.getDataController = function () {
        return this.controllerData;
    };
    Player.prototype.enemyOnFieldOfView = function (enemy) {
    };
    Player.prototype.drawShape = function (ctx) {
        this.pellet.drawShape(ctx);
    };
    Player.prototype.drawRestField = function (ctx) {
        this.pellet.drawRestField(ctx);
    };
    Player.prototype.damage = function () {
        if (this.pellet.isAlive()) {
            if (this.pellet.damage()) {
                kill(this.id);
            }
        }
    };
    Player.prototype.getShieldPoints = function () {
        return this.pellet.getShieldPoints();
    };
    Player.prototype.respawn = function (x, y) {
        this.pellet.setX(x);
        this.pellet.setY(y);
        this.sounds.respawn.play();
        this.pellet.reborn();
    };
    Player.prototype.iSee = function (obj) {
        return this.viewField.iSee(obj);
    };
    Player.prototype.drawBySonar = function (ctx, op) {
        this.pellet.drawBySonar(ctx, op);
    };
    Player.prototype.getSonarOpacity = function () {
        return (this.pellet.sonarOpacity >= 0) ? this.pellet.sonarOpacity : 0;
    };
    return Player;
}());
export { Player };
